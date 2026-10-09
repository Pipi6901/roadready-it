# -*- coding: utf-8 -*-
"""Generate the bundled seed bank from the parsed listato.

The seed is what the app ships with and falls back to: it exists so the thing
can be built, demoed and QA'd before content.json is reachable, and it is
replaced wholesale the first time the real bundle arrives.

Two rules decide what goes in:

- No figures. The seed ships no media (the real bank's images come from
  Storage), so a statement that says "il segnale raffigurato" is unanswerable
  here. Only statements that stand on their own text are eligible.
- Balanced. A few per argomento rather than whatever sorts first, so the topic
  map has something under every node and the paper generator has all 25
  chapters to draw from.

Usage:
  python -X utf8 scripts/make_seed.py [count-per-topic]
"""
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'content', 'listato', 'content.json')
OUT_DIR = os.path.join(ROOT, 'src', 'data', 'it-bank')

# A statement that leans on the picture cannot be asked without it.
NEEDS_FIGURE = re.compile(r'raffigurat|in figura|rappresentat[ao] in figura|'
                          r'il pannello|la segnaletica in|secondo la figura', re.I)


def ts_string(value):
    """A TypeScript single-quoted literal."""
    return "'" + value.replace('\\', '\\\\').replace("'", "\\'") + "'"


def main():
    per_topic = int(sys.argv[1]) if len(sys.argv) > 1 else 5
    with open(SRC, encoding='utf-8') as f:
        bundle = json.load(f)

    eligible = {}
    for q in bundle['questions']:
        if q['sourceMedia'] or NEEDS_FIGURE.search(q['text']):
            continue
        eligible.setdefault(q['topicId'], []).append(q)

    picked = []
    for topic in bundle['topics']:
        rows = sorted(eligible.get(topic['id'], []), key=lambda q: q['id'])
        picked.extend(rows[:per_topic])

    os.makedirs(OUT_DIR, exist_ok=True)

    lines = [
        '/**',
        ' * The Italian seed bank, generated from the ministerial listato.',
        ' *',
        ' * Real questions, not invented ones: scripts/make_seed.py takes the parsed',
        ' * listato and keeps the statements that stand without a picture, a few from',
        ' * every argomento. The seed ships no media, so anything that says "il segnale',
        ' * raffigurato" is excluded — it would be unanswerable here.',
        ' *',
        ' * This is demo content in the sense that it is a subset; the full bank arrives',
        ' * through content.json and replaces it wholesale. What it has to get right is',
        ' * the format, so the paper generator and the VERO/FALSO screens are exercised',
        ' * for real before the whole listato is reachable.',
        ' *',
        ' * Generated file — edit scripts/make_seed.py, not this.',
        ' */',
        "import type { Question } from '@/types/content';",
        '',
        '/** [id, text, correct, topicId, sourceRef] — the options are always VERO/FALSO. */',
        "type Row = [string, string, 'V' | 'F', string, string];",
        '',
        'const ROWS: Row[] = [',
    ]
    for q in picked:
        lines.append('  [{}, {}, {}, {}, {}],'.format(
            ts_string(q['id']), ts_string(q['text']), ts_string(q['correctOptionId']),
            ts_string(q['topicId']), ts_string(q['sourceRef'])))
    lines += [
        '];',
        '',
        '/** Every statement in the exam offers exactly these two, in this order. */',
        "const OPTIONS = [{ id: 'V', text: 'Vero' }, { id: 'F', text: 'Falso' }];",
        '',
        'export const IT_QUESTIONS: Question[] = ROWS.map(([id, text, correct, topicId, sourceRef]) => ({',
        '  id,',
        '  topicId,',
        "  type: 'single_choice',",
        '  text,',
        '  options: OPTIONS,',
        '  correctOptionId: correct,',
        '  // The listato ships no explanations; they are written separately and',
        '  // reach the app through content.json.',
        "  explanation: '',",
        '  mediaId: null,',
        '  sourceMedia: null,',
        '  subtopic: null,',
        '  sourceRef,',
        '  // No `category`: Italy has one class of question, not two.',
        '  points: 1,',
        "  licences: ['AM', 'A1', 'A2', 'A', 'B1', 'B', 'BE'],",
        '}));',
        '',
    ]
    with open(os.path.join(OUT_DIR, 'questions.ts'), 'w', encoding='utf-8', newline='') as f:
        f.write('\n'.join(lines))

    index = '''/**
 * The seed bank as the bundle reads it.
 *
 * Translations are empty on purpose: the five launch languages are written
 * against the full listato and arrive through content.json, not in the binary.
 * An empty catalogue is the honest state — BilingualText falls back to the
 * Italian when a translation is missing, which is exactly what should happen.
 */
import type { TranslationBundle } from '@/types/content';

export { IT_QUESTIONS } from './questions';

export const IT_BANK_TRANSLATIONS: TranslationBundle = {};
'''
    with open(os.path.join(OUT_DIR, 'index.ts'), 'w', encoding='utf-8', newline='') as f:
        f.write(index)

    by_topic = {}
    for q in picked:
        by_topic[q['topicId']] = by_topic.get(q['topicId'], 0) + 1
    thin = [t['id'] for t in bundle['topics'] if by_topic.get(t['id'], 0) < per_topic]
    print(f'seed: {len(picked)} questions across {len(by_topic)} of {len(bundle["topics"])} topics')
    if thin:
        print(f'fewer than {per_topic} text-only statements available in: {", ".join(thin)}')


if __name__ == '__main__':
    main()
