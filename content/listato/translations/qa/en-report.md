# English (en) — translation QA report

## 1. Automatic checks

- Entries: 7020 (expected 7020)
- Unknown ids: 0
- Empty texts: 0
- Statements whose source numbers are missing in the translation: 0
- Italian leftovers outside brackets (names and abbreviations excluded): 0

## 2. Blind back-translation sample

150 random question ids, back-translated into Italian by a model that never saw the source, then compared by an independent judge (meaning, negations, limiters, numbers, conditions) and by the automatic marker comparison.

- Discrepant ids: **7 of 150 (4.7%)**
- All discrepancies were sent to the fix loop; resolved: 7 of 7 statements

  - `u0159` Il segnale raffigurato indica una strada sterrata  
    before: The sign shown indicates an unpaved road  
    after: The sign shown in the picture indicates an unpaved road  
    problems: back-translation: negation: source has 0, back-translation has 1
  - `u3270` La striscia a zig zag della segnaletica in figura serve agli autobus per facilitare la manovra di accostamento e per ripartire  
    before: The zigzag line of the road marking in the picture serves buses to make pulling in to the kerb and setting off again easier  
    after: The zig-zag line of the road markings in the picture serves buses to make it easier to pull in to the kerb and to set off again  
    problems: back-translation: more: source [] vs back-translation ['più']
  - `u3493` Nelle autostrade possono circolare solo gli autoveicoli  
    before: On motorways only motor vehicles may travel  
    after: Only motor vehicles can travel on motorways  
    problems: meaning_identical = false; 'autoveicoli' (four-wheeled-type motor vehicles, excluding motorcycles) rendered as broad 'motor vehicles' (back-translation 'veicoli a motore'); generalisation changes the truth value since motorcycles also use motorways
  - `u3919` La striscia bianca laterale discontinua in figura, delimita una piazzola di sosta  
    before: The broken white side line in the picture delimits a parking bay  
    after: The broken white side line in the picture marks out a lay-by (piazzola di sosta)  
    problems: meaning_identical = false; 'piazzola di sosta' (lay-by / stopping area) rendered as 'parking bay' (back-translation 'stallo di sosta'), a different road element
  - `u5463` Nel rispetto della larghezza massima stabilita per i rimorchi T.A.T.S., le imbarcazioni trasportate possono sporgere fino a 50 centimetri per ogni lato rispetto ai bordi esterni delle luci di posizione posteriori  
    before: Within the maximum width established for T.A.T.S. trailers, the boats being carried may project up to 50 centimetres on each side beyond the outer edges of the rear position lights  
    after: Within the maximum width established for T.A.T.S. trailers, the boats carried may project up to 50 centimetres on each side beyond the outer edges of the rear position lights  
    problems: back-translation: more: source [] vs back-translation ['oltre']
  - `u6026` In caso di infossamento su neve o sabbia, non riuscendo a spostare il veicolo, è consigliabile inserire sotto la ruota che slitta qualcosa che faccia attrito (pezzi di legno, tappeti del veicolo, ecc.)  
    before: If the vehicle is bogged down in snow or sand and you cannot move it, it is advisable to put something that creates friction under the slipping wheel (pieces of wood, the vehicle's mats, etc.)  
    after: In case of getting stuck in snow or sand, being unable to move the vehicle, it is advisable to put something that provides grip (pieces of wood, the vehicle's mats, etc.) under the wheel that is slipping  
    problems: back-translation: if: source [] vs back-translation ['se']
  - `u6344` L'inquinamento atmosferico prodotto dai veicoli scompare del tutto accelerando a fondo, perché l'alta temperatura fa consumare in fretta il carburante  
    before: Atmospheric pollution produced by vehicles disappears completely by accelerating flat out, because the high temperature makes the fuel burn up quickly  
    after: The air pollution produced by vehicles disappears completely by accelerating hard, because the high temperature makes the fuel burn up quickly  
    problems: back-translation: atmost: source [] vs back-translation ['ATMOST']

## 3. Negation and limiter pass

Every statement with non / solo / soltanto / sempre / mai: 1124 unique statements (1144 ids), checked by an adversarial auditor.

- Flagged: 5

## Fix rounds

- Round 1: 13 in, 10 resolved, 3 left
- Round 2: 3 in, 1 resolved, 2 left
- Round 3: 2 in, 1 resolved, 1 left
- Round 4: 1 in, 1 resolved, 0 left

Remaining flagged after all rounds: 0

Source remarks (typos in the Italian, translated literally): 15 statements, see source-issues.md.
