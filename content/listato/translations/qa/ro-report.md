# Romanian (ro) — translation QA report

## 1. Automatic checks

- Entries: 7020 (expected 7020)
- Unknown ids: 0
- Empty texts: 0
- Statements whose source numbers are missing in the translation: 0
- Italian leftovers outside brackets (names and abbreviations excluded): 0

## 2. Blind back-translation sample

150 random question ids, back-translated into Italian by a model that never saw the source, then compared by an independent judge (meaning, negations, limiters, numbers, conditions) and by the automatic marker comparison.

- Discrepant ids: **5 of 150 (3.3%)**
- All discrepancies were sent to the fix loop; resolved: 5 of 5 statements

  - `u0560` Il segnale raffigurato indica, su strade a carreggiate separate, la presenza di un cavalcavia per effettuare l'inversione di marcia  
    before: Indicatorul din imagine indică, pe drumurile cu părți carosabile separate, prezența unui viaduct pentru efectuarea întoarcerii  
    after: Indicatorul din imagine semnalează, pe drumurile cu părți carosabile separate, prezența unui pasaj superior pentru efectuarea întoarcerii  
    problems: meaning_identical = false; 'cavalcavia' (overpass) rendered as 'viaduct' (viaduct/valley bridge), object of the sign changed
  - `u1991` Il segnale raffigurato è un segnale generico di pericolo  
    before: Indicatorul din imagine este un indicator general de avertizare  
    after: Indicatorul din imagine este un indicator generic de pericol  
    problems: meaning_identical = false; 'segnale generico di pericolo' rendered as 'indicator general de avertizare' (general warning sign); 'pericol' dropped, can read as the whole warning-sign category instead of the specific generic-danger sign
  - `u2892` Il segnale raffigurato preannuncia una cunetta  
    before: Indicatorul din imagine anunță din timp o rigolă (denivelare în jos)  
    after: Indicatorul din imagine anunță o adâncitură a părții carosabile (cunetta)  
    problems: meaning_identical = false; 'cunetta' rendered as 'rigolă' (gutter/drain channel) with an added gloss '(denivelare în jos)'; base term wrong and explanation added
  - `u4770` Negli incroci regolati con circolazione rotatoria, in assenza di specifico segnale, vale la regola generale di dare la precedenza a destra  
    before: La intersecțiile reglementate cu sens giratoriu, în lipsa unui indicator specific, se aplică regula generală de a acorda prioritate vehiculelor din dreapta  
    after: La intersecțiile reglementate cu sens giratoriu, în lipsa unui indicator specific, se aplică regula generală de a acorda prioritate vehiculelor din dreapta  
    problems: back-translation: negation: source has 1, back-translation has 0
  - `u6027` In caso di infossamento su neve o sabbia, non riuscendo a partire con la prima marcia è opportuno innestare una marcia superiore  
    before: În caz de înfundare în zăpadă sau nisip, dacă nu se reușește plecarea cu treapta întâi, este oportun să se cupleze o treaptă superioară  
    after: În caz de împotmolire în zăpadă sau nisip, nereușind să porniți în treapta întâi, este indicat să cuplați o treaptă superioară  
    problems: back-translation: if: source [] vs back-translation ['se']

## 3. Negation and limiter pass

Every statement with non / solo / soltanto / sempre / mai: 1124 unique statements (1144 ids), checked by an adversarial auditor.

- Flagged: 8

## Fix rounds

- Round 1: 13 in, 11 resolved, 2 left
- Round 2: 2 in, 2 resolved, 0 left

Remaining flagged after all rounds: 0

Source remarks (typos in the Italian, translated literally): 15 statements, see source-issues.md.
