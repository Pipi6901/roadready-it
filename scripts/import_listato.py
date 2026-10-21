# -*- coding: utf-8 -*-
"""Turn the ministerial listato into the app's content bundle.

Source: the official question file the Ministero delle Infrastrutture e dei
Trasporti publishes on il Portale dell'Automobilista, "Patente AB" —

  https://www.ilportaledellautomobilista.it/web/portale-automobilista/-/quiz-per-le-patenti-am-b-superiori-e-cqc

It is one PDF: 586 pages, 715 quesiti, 7020 true/false statements with their
correct answers, and the figures embedded page by page. Unlike the Polish
catalogue it carries its own taxonomy — every quesito is headed with one of
the 25 official argomenti — so there is no classifier here and nothing to
guess.

Layout, which is what makes this parseable at all: on every page the rows sit
at a fixed grid. The statement (number plus text) is one block at x~22, its
VERO/FALSO is a block at x~355 on the same line, and the figure is placed at
x~466 in the same vertical band. A "Quesito n° N - argomento" header applies
to every row BELOW it until the next header; rows above the first header on a
page continue the quesito carried over from the page before.

Writes:
  content/listato/content.json   the bundle the admin seeds from
  content/listato/figures/       the deduplicated figures, named by content
  content/listato/review.csv     one row per statement, for eyeballing

Usage:
  python -X utf8 scripts/import_listato.py [path-to.pdf]
"""
import csv
import hashlib
import json
import os
import re
import sys
import unicodedata
from collections import Counter, defaultdict

import pymupdf

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEFAULT_PDF = r'D:/стажа/media-it/source/210926_Conseguimento_A-B_italiano.pdf'
OUT_DIR = os.path.join(ROOT, 'content', 'listato')

QUESITO = re.compile(r'Quesito n°\s*(\d+)\s*-\s*(.+)', re.S)
ROW_NUMBER = re.compile(r'^(\d{4,6})\b')
ANSWER = {'VERO': 'V', 'FALSO': 'F'}

# The two buttons, per language.
#
# The listato gives them only in Italian, and translate-questions.js leaves a
# true/false statement's `options` empty because there is nothing per-question
# to translate — which would have left a Romanian reader with the statement in
# Romanian and the two answers still reading "Vero" and "Falso". They are the
# same two words on all 7,020 questions, so they belong here rather than in
# 7,020 translation entries. German and French are the exam's own wording in
# Alto Adige and Valle d'Aosta, not our choice.
VERO_FALSO = {
    'it': ('Vero', 'Falso'),
    'de': ('Richtig', 'Falsch'),
    'fr': ('Vrai', 'Faux'),
    'en': ('True', 'False'),
    'es': ('Verdadero', 'Falso'),
    'ro': ('Adevărat', 'Fals'),
    'uk': ('Правда', 'Неправда'),
    'ar': ('صحيح', 'خطأ'),
}

# Column bands, in points. The grid is identical on every page.
TEXT_X_MAX = 100
ANSWER_X_MIN = 340
IMAGE_X_MIN = 420

# Table furniture that repeats on every page and is not content.
NOISE = {
    'Numero', 'domanda', 'Numero\ndomanda', 'Testo domanda', 'Risposta Corretta',
    'Immagine', 'Testo domanda\nRisposta Corretta\nImmagine',
    'Ministero delle Infrastrutture e dei Trasporti',
}

# The licence classes this file covers — it is the "Conseguimento A-B" listato.
LICENCES = ['AM', 'A1', 'A2', 'A', 'B1', 'B', 'BE']

# One lucide icon per argomento, keyed by the slug built below.
ICONS = {
    'segnali-di-pericolo': 'triangle-alert',
    'segnali-di-divieto': 'circle-slash',
    'segnali-di-obbligo': 'circle-arrow-right',
    'segnali-di-precedenza': 'git-fork',
    'segnali-di-indicazione': 'info',
    'pannelli-integrativi-dei-segnali': 'tag',
    'segnali-complementari-segnali-temporanei-e-di-cantiere': 'cone',
    'segnaletica-orizzontale-segni-sugli-ostacoli': 'route',
    'segnalazioni-semaforiche-segnalazioni-degli-agenti-del-traffico': 'traffic-cone',
    'esempi-di-precedenza': 'git-fork',
    'limiti-di-velocita': 'gauge',
    'distanza-di-sicurezza': 'ruler',
    'norme-sul-sorpasso': 'arrow-left-right',
    'fermata-sosta-arresto-e-partenza': 'circle-parking',
    'ingombro-della-carreggiata': 'truck',
    'definizioni-stradali-e-di-traffico': 'book-open',
    'norme-sulla-circol-dei-veicoli': 'car',
    'uso-delle-luci-uso-dei-dispositivi-acustici-spie-e-simboli': 'lightbulb',
    'equipaggiamento-cinture-casco': 'shield',
    'elementi-costitutivi-del-veicolo-importanti-per-la-sicurezza': 'wrench',
    'patenti-di-guida-documenti-di-circolazione-del-veicolo': 'file-text',
    'responsabilita-civile-penale-amministrativa': 'scale',
    'guida-in-relazione-alle-qualita-e-condizioni-fisiche-e-psichiche': 'heart-pulse',
    'comportamenti-per-prevenire-incidenti-stradali': 'shield-alert',
    'limitazione-dei-consumi-rispetto-dell-ambiente': 'leaf',
}
FALLBACK_ICON = 'book-open'


def slug(text):
    """Stable id from an argomento name: ASCII, lowercase, dash separated."""
    t = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode()
    t = re.sub(r'[^a-zA-Z0-9]+', '-', t).strip('-').lower()
    return re.sub(r'-+', '-', t)


def short_name(full):
    """A map label out of an official argomento.

    The ministry's names run to a hundred characters with semicolons in them
    ("Definizioni stradali e di traffico; definizioni e classificazione dei
    veicoli; doveri del conducente..."). A node on the topic map has room for
    three lines, so the label is the first clause and the full string stays in
    review.csv.
    """
    s = full.split(';')[0].split('(')[0]
    s = s.replace('\u00ac', '').strip(' -\u2013\u2014.,')
    return re.sub(r'\s+', ' ', s)


NUMBER_ONLY = re.compile(r'^(\d{4,6})$')
TRAILING_ANSWER = re.compile(r'\s+(VERO|FALSO)$', re.I)


def parse(pdf_path):
    doc = pymupdf.open(pdf_path)
    rows = []            # one dict per statement
    figures = {}         # md5 -> (bytes, ext, width, height)
    current = None       # (quesito number, argomento) carried across pages
    lost = []            # statements whose answer never turned up

    def close(pending):
        """A statement is finished by the next one starting, not by its answer:
        the answer column sits on the first line of a text that usually wraps
        to a second."""
        if pending['answer'] is None:
            lost.append(pending['number'])
            return
        pending['text'] = re.sub(r'\s+', ' ', ' '.join(pending['parts'])).strip()
        del pending['parts']
        rows.append(pending)

    for page in doc:
        # Lines, not blocks: PyMuPDF merges adjacent short rows into one block,
        # and a merged block has one bbox for several statements.
        lines = []
        for block in page.get_text('dict')['blocks']:
            if block.get('type') != 0:
                continue
            for ln in block['lines']:
                text = ''.join(sp['text'] for sp in ln['spans']).strip()
                if text:
                    lines.append((ln['bbox'][0], ln['bbox'][1], text))
        lines.sort(key=lambda l: (round(l[1], 1), l[0]))

        placements = []
        for info in page.get_images(full=True):
            xref = info[0]
            for rect in page.get_image_rects(xref):
                if rect.x0 >= IMAGE_X_MIN:
                    placements.append((rect, xref))

        def figure_at(y):
            for rect, xref in placements:
                if rect.y0 - 4 <= y <= rect.y1 + 4:
                    blob = doc.extract_image(xref)
                    digest = hashlib.md5(blob['image']).hexdigest()
                    figures.setdefault(
                        digest, (blob['image'], blob['ext'], blob['width'], blob['height']))
                    return digest
            return None

        pending = None
        header_open = False
        for x0, y0, text in lines:
            if text in NOISE:
                continue

            m = QUESITO.match(text)
            if m:
                # A header ends the statement above it, and its argomento can
                # wrap onto further lines ("... riguardo verso gli utenti
                # deboli della strada (anziani, ..."): those belong to the
                # header, not to whatever statement happened to be open.
                if pending:
                    close(pending)
                    pending = None
                current = (int(m.group(1)), re.sub(r'\s+', ' ', m.group(2)).strip())
                header_open = True
                continue

            if x0 >= ANSWER_X_MIN:
                answer = ANSWER.get(text.upper())
                if answer and pending:
                    pending['answer'] = answer
                continue

            if x0 >= TEXT_X_MAX or current is None:
                continue

            if header_open and not NUMBER_ONLY.match(text):
                current = (current[0], current[1] + ' ' + text)
                continue

            m = NUMBER_ONLY.match(text)
            if m:
                header_open = False
                if pending:
                    close(pending)
                pending = {
                    'quesito': current[0],
                    'argomento': current[1],
                    'number': m.group(1),
                    'parts': [],
                    'answer': None,
                    'figure': figure_at(y0),
                }
                continue

            if not pending:
                continue

            # Short rows are laid out with the answer as the last word of the
            # text itself instead of in the answer column.
            trailing = TRAILING_ANSWER.search(text)
            if trailing:
                pending['parts'].append(text[: trailing.start()])
                pending['answer'] = ANSWER[trailing.group(1).upper()]
            else:
                pending['parts'].append(text)

        # Rows do not straddle pages, so whatever is open here is complete.
        if pending:
            close(pending)
            pending = None

    if lost:
        print(f'WARNING: {len(lost)} statements had no answer, e.g. {lost[:5]}')
    return rows, figures


def build(rows, figures):
    topics, order = {}, []
    for r in rows:
        tid = slug(short_name(r['argomento']))
        if tid not in topics:
            topics[tid] = {
                'id': tid,
                'name': short_name(r['argomento']),
                'slug': tid,
                'icon': ICONS.get(tid, FALLBACK_ICON),
                'sortOrder': len(order),
                'questionCount': 0,
            }
            order.append(tid)
        r['topicId'] = tid

    questions = []
    for r in rows:
        questions.append({
            'id': f"q-{r['number']}",
            'topicId': r['topicId'],
            'type': 'single_choice',
            'text': r['text'],
            # The exam offers exactly these two, in this order, every time.
            'options': [{'id': 'V', 'text': 'Vero'}, {'id': 'F', 'text': 'Falso'}],
            'correctOptionId': r['answer'],
            # The listato ships no explanations; they are written separately.
            'explanation': '',
            'mediaId': None,
            'sourceMedia': f"{r['figure']}.{figures[r['figure']][1]}" if r['figure'] else None,
            'subtopic': None,
            'sourceRef': f"Listato MIT, quesito n° {r['quesito']}, domanda {r['number']}",
            # No `category`: Italy has one class of question, not two.
            'points': 1,
            'licences': LICENCES,
        })

    counts = Counter(q['topicId'] for q in questions)
    for tid, t in topics.items():
        t['questionCount'] = counts[tid]
    return questions, [topics[t] for t in order]


def load_translations(locales, question_ids):
    """Fold content/listato/translations/{lang}.json into the bundle.

    scripts/translate-questions.js in the admin repo writes one file per
    language, keyed by question id, and resumes batch by batch — so a file can
    legitimately be partial, and a language with no file at all is simply one
    nobody has run yet. Neither is an error here: the publish step decides what
    is complete enough to ship, and a half-translated language still reads
    better than none, because the app falls back to the Italian per question.

    Without this the bundle shipped `translations: {}` no matter how many
    languages had been generated, and every one of them was invisible to the
    app.
    """
    out = {}
    for locale in locales:
        code = locale['code']
        path = os.path.join(OUT_DIR, 'translations', f'{code}.json')
        if not os.path.exists(path):
            print(f'  {code}: no translations/{code}.json — skipped')
            continue
        with open(path, encoding='utf-8') as f:
            raw = json.load(f)

        vero, falso = VERO_FALSO.get(code, VERO_FALSO['it'])
        catalogue = {}
        unknown = 0
        for qid, entry in raw.items():
            if qid not in question_ids:
                unknown += 1
                continue
            text = (entry.get('text') or '').strip()
            if not text:
                continue
            catalogue[qid] = {
                'text': text,
                # The per-question options are empty for a true/false bank, so
                # the two answers come from the table above rather than from
                # the translator.
                'options': {'V': vero, 'F': falso},
                'explanation': (entry.get('explanation') or '').strip(),
            }
        if catalogue:
            out[code] = catalogue
        note = f', {unknown} ids not in this listato' if unknown else ''
        print(f'  {code}: {len(catalogue)}/{len(question_ids)} translated{note}')
    return out


def main():
    pdf_path = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_PDF
    rows, figures = parse(pdf_path)

    unanswered = [r for r in rows if not r['answer']]
    if unanswered:
        print(f'WARNING: {len(unanswered)} statements without an answer, dropped')
        rows = [r for r in rows if r['answer']]

    questions, topics = build(rows, figures)

    ids = Counter(q['id'] for q in questions)
    dupes = [i for i, n in ids.items() if n > 1]

    os.makedirs(os.path.join(OUT_DIR, 'figures'), exist_ok=True)
    for digest, (blob, ext, _w, _h) in figures.items():
        with open(os.path.join(OUT_DIR, 'figures', f'{digest}.{ext}'), 'wb') as f:
            f.write(blob)

    with open(os.path.join(ROOT, 'content', 'listato', 'country.json'), encoding='utf-8') as f:
        country = json.load(f)
    with open(os.path.join(ROOT, 'content', 'listato', 'locales.json'), encoding='utf-8') as f:
        locales = json.load(f)
    country = {**country, 'questionCount': len(questions)}

    print('translations:')
    translations = load_translations(locales, {q['id'] for q in questions})

    payload = {
        'country': country,
        'topics': topics,
        'questions': questions,
        'translations': translations,
        'media': {},
        'versionHash': f'listato-{len(questions)}',
        'countries': [country],
        'locales': locales,
    }
    out = os.path.join(OUT_DIR, 'content.json')
    with open(out, 'w', encoding='utf-8') as f:
        json.dump(payload, f, ensure_ascii=False, separators=(',', ':'))

    with open(os.path.join(OUT_DIR, 'review.csv'), 'w', encoding='utf-8-sig', newline='') as f:
        w = csv.writer(f, delimiter=';')
        w.writerow(['id', 'quesito', 'topic', 'answer', 'figure', 'text', 'argomento ufficiale'])
        by_id = {q['id']: q for q in questions}
        for r in rows:
            q = by_id[f"q-{r['number']}"]
            w.writerow([q['id'], r['quesito'], q['topicId'], q['correctOptionId'],
                        q['sourceMedia'] or '', q['text'], r['argomento']])

    missing = sum(1 for q in questions if not q['sourceMedia'])
    print(f'statements: {len(questions)}  quesiti: {len({r["quesito"] for r in rows})}')
    print(f'topics: {len(topics)}  figures: {len(figures)}  without a figure: {missing}')
    print(f'answers: ' + str(dict(Counter(q['correctOptionId'] for q in questions))))
    print(f'duplicate ids: {len(dupes)}  size: {os.path.getsize(out) / 1e6:.1f} MB')
    for t in topics:
        print(f'  {t["questionCount"]:>5}  {t["id"]}')


if __name__ == '__main__':
    main()
