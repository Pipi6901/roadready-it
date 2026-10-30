# Spanish (es) — translation QA report

## 1. Automatic checks

- Entries: 7020 (expected 7020)
- Unknown ids: 0
- Empty texts: 0
- Statements whose source numbers are missing in the translation: 0
- Italian leftovers outside brackets (names and abbreviations excluded): 0

## 2. Blind back-translation sample

150 random question ids, back-translated into Italian by a model that never saw the source, then compared by an independent judge (meaning, negations, limiters, numbers, conditions) and by the automatic marker comparison.

- Discrepant ids: **8 of 150 (5.3%)**
- All discrepancies were sent to the fix loop; resolved: 8 of 8 statements

  - `u0017` Il segnale raffigurato vieta agli autocarri di massa superiore a 3,5 t di proseguire diritto  
    before: La señal representada en la imagen prohíbe a los camiones de masa máxima autorizada superior a 3,5 t continuar recto  
    after: La señal representada (en la imagen) prohíbe a los camiones de masa superior a 3,5 t seguir recto  
    problems: meaning_identical = false; 'masa máxima autorizada' adds 'máxima autorizada' not in source 'massa', narrowing the mass meaning
  - `u0298` Il segnale raffigurato preavvisa di svoltare a destra per S. Giovanni  
    before: La señal representada en la imagen advierte de que hay que girar a la derecha hacia S. Giovanni  
    after: La señal representada (en la imagen) preavisa del giro a la derecha hacia S. Giovanni  
    problems: limiters_match = false; meaning_identical = false; 'preavvisa di svoltare' (pre-announces the right turn) rendered 'advierte de que hay que girar' adding an obligation ('hay que')
  - `u2792` Il segnale raffigurato vieta il transito a veicoli sprovvisti di catene o pneumatici invernali  
    before: La señal representada en la imagen prohíbe el tránsito a vehículos sin cadenas o neumáticos de invierno  
    after: La señal representada (en la imagen) prohíbe el tránsito a los vehículos desprovistos de cadenas o neumáticos de invierno  
    problems: back-translation: negation: source has 1, back-translation has 2
  - `u4015` Il pannello integrativo raffigurato indica un'officina meccanica per autotreni  
    before: El panel complementario representado indica un taller mecánico para tractocamiones  
    after: El panel complementario representado (en la imagen) indica un taller mecánico para trenes de carretera (autotreni)  
    problems: meaning_identical = false; 'autotreni' (truck with trailer) mistranslated as 'tractocamiones' (tractor units)
  - `u4557` In un centro abitato, quando un pedone, fuori delle strisce di attraversamento, non accenni a darci la precedenza, è necessario ridurre la velocità e, occorrendo, fermarsi per non investirlo  
    before: En un poblado, cuando un peatón, fuera de los pasos de peatones, no da señales de cedernos el paso, es necesario reducir la velocidad y, si es preciso, detenerse para no atropellarlo  
    after: En poblado, cuando un peatón, fuera del paso de peatones, no da muestras de cedernos el paso, es necesario reducir la velocidad y, en caso necesario, detenerse para no atropellarlo  
    problems: back-translation: if: source [] vs back-translation ['se']
  - `u5174` La sosta a meno di 15 metri dal segnale di fermata autobus, qualora gli spazi di stazionamento non siano delimitati, è consentita azionando la segnalazione luminosa di pericolo (quattro frecce lampeggianti simultaneamente)  
    before: El estacionamiento a menos de 15 metros de la señal de parada de autobuses, cuando los espacios de estacionamiento no estén delimitados, se permite accionando la señal luminosa de peligro (cuatro indicadores de dirección parpadeando simultáneamente)  
    after: El estacionamiento a menos de 15 metros de la señal de parada de autobús, en caso de que los espacios de estacionamiento no estén delimitados, está permitido accionando la señalización luminosa de peligro (cuatro intermitentes simultáneamente)  
    problems: back-translation: if: source ['qualora'] vs back-translation []
  - `u5353` Risulta facile al conducente di un autoveicolo valutare la distanza che lo separa da un ciclomotorista che rallenta bruscamente per svoltare in una strada non sufficientemente segnalata  
    before: Resulta fácil para el conductor de un automóvil valorar la distancia que lo separa de un conductor de ciclomotor que reduce bruscamente la velocidad para girar a una vía insuficientemente señalizada  
    after: Al conductor de un automóvil le resulta fácil valorar la distancia que lo separa de un conductor de ciclomotor que reduce bruscamente la velocidad para girar hacia una vía no suficientemente señalizada  
    problems: back-translation: negation: source has 1, back-translation has 0
  - `u5480` Durante la marcia, il rimorchio deve avere il ruotino pivottante di manovra abbassato (poggiato al suolo)  
    before: Durante la marcha, el remolque debe tener la rueda pivotante de maniobra levantada (no apoyada en el suelo)  
    after: Durante la marcha, el remolque debe tener la rueda pivotante de maniobra bajada (apoyada en el suelo)  
    problems: negations_match = false; meaning_identical = false; 'abbassato (poggiato al suolo)' reversed to 'levantada (no apoyada en el suelo)': lowered/resting on ground became raised/not resting, adds negation 'no'; back-translation: negation: source has 0, back-translation has 1

## 3. Negation and limiter pass

Every statement with non / solo / soltanto / sempre / mai: 1124 unique statements (1144 ids), checked by an adversarial auditor.

- Flagged: 6

## Fix rounds

- Round 1: 15 in, 14 resolved, 1 left
- Round 2: 1 in, 0 resolved, 1 left
- Round 3: 1 in, 0 resolved, 1 left

Remaining flagged after all rounds: 0

## Manual decisions

- `u3877` La striscia di mezzo in figura non consente il sorpasso in ogni caso  
  → La línea central de la imagen no permite el adelantamiento en ningún caso  
  auditor read 'non ... in ogni caso' as 'not in every case'; the ministry's official French text has 'n'autorise en aucun cas le dépassement' (in no case), so 'en ningún caso' is kept

Source remarks (typos in the Italian, translated literally): 15 statements, see source-issues.md.
