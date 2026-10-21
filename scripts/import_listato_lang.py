# -*- coding: utf-8 -*-
"""Official German and French wording of the listato -> content/listato/translations/{de,fr}.json.

The ministry publishes the same listato, same page layout, same quesito and
domanda numbers, in German and French (the two exam languages of Alto Adige and
Valle d'Aosta). So nothing here is a translation: each statement is read out of
the translated PDF with the Italian parser and matched to the Italian one by its
domanda number. Before anything is written the two are cross-checked, because
the whole value of an official text is that it says the same thing:

  - the set of domanda numbers must be identical;
  - the VERO/FALSO answer must be identical on every statement;
  - no statement may come out empty.

Anything that fails is listed and the file is NOT written for that language.

Usage:
  python -X utf8 scripts/import_listato_lang.py            # both
  python -X utf8 scripts/import_listato_lang.py de         # one
"""
import io
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
sys.stdout.reconfigure(encoding='utf-8')

import import_listato as base  # noqa: E402

SOURCES = {
    'de': r'D:/стажа/media-it/source/210926_Conseguimento_A-B_tedesco.pdf',
    'fr': r'D:/стажа/media-it/source/210926_Conseguimento_A-B_francese.pdf',
}


def main():
    langs = sys.argv[1:] or list(SOURCES)
    with io.open(os.path.join(base.OUT_DIR, 'content.json'), encoding='utf-8') as f:
        it = json.load(f)
    italian = {q['id']: q for q in it['questions']}
    os.makedirs(os.path.join(base.OUT_DIR, 'translations'), exist_ok=True)

    for lang in langs:
        print(f'== {lang}: {SOURCES[lang]}')
        rows, _figures = base.parse(SOURCES[lang])
        found = {}
        for r in rows:
            if r['answer']:
                found[f"q-{r['number']}"] = r

        missing = sorted(set(italian) - set(found))
        extra = sorted(set(found) - set(italian))
        wrong = [qid for qid in found if qid in italian and found[qid]['answer'] != italian[qid]['correctOptionId']]
        empty = [qid for qid, r in found.items() if not r['text'].strip()]
        same_as_it = [qid for qid, r in found.items() if qid in italian and r['text'] == italian[qid]['text']]

        print(f'  statements read: {len(found)} (Italian: {len(italian)})')
        print(f'  missing: {len(missing)}  extra: {len(extra)}  answer differs: {len(wrong)}  empty: {len(empty)}')
        print(f'  text identical to the Italian (suspicious if many): {len(same_as_it)}')
        if missing:
            print('  missing e.g.', missing[:8])
        if extra:
            print('  extra e.g.', extra[:8])
        if wrong:
            print('  answer differs e.g.', wrong[:8])
        if missing or extra or wrong or empty:
            print(f'  !! {lang}: checks failed, nothing written')
            continue

        out = {qid: {'text': found[qid]['text']} for qid in italian}
        path = os.path.join(base.OUT_DIR, 'translations', f'{lang}.json')
        with io.open(path, 'w', encoding='utf-8') as f:
            json.dump(out, f, ensure_ascii=False, separators=(',', ':'))
        print(f'  wrote {path} ({os.path.getsize(path) / 1e6:.1f} MB)')
        for qid in list(italian)[:2] + list(italian)[3500:3502]:
            print('   ', qid, '|', italian[qid]['text'][:70], '=>', out[qid]['text'][:70])


if __name__ == '__main__':
    main()
