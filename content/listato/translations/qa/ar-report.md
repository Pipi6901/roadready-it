# Arabic (ar) — translation QA report

## 1. Automatic checks

- Entries: 6993 (expected 6993)
- Unknown ids: 0
- Empty texts: 0
- Statements whose source numbers are missing in the translation: 0
- Italian leftovers outside brackets (names and abbreviations excluded): 0
- Eastern Arabic digits: 0
- Units written in Arabic script: 0

## 2. Arabic pipeline

- Step 1: dangerous elements extracted into ar-markers.json (negations, limiters, conditions, numbers with units, comparisons).
- Step 2: three independent translations (t1 Opus, t2 Sonnet, t3 a second independent Opus run), each request seeing only the Italian and the glossary.
- Step 3: each variant back-translated into Italian by a different model that never saw the source; markers compared automatically.
  - Mismatches per variant: {'t1': 203, 't2': 202, 't3': 236}; chosen variant: {'t1': 2185, 't2': 3748, 't3': 800}
  - Statements disputed after step 3: 353
- Step 4: adversarial auditor on the chosen translation of all 6733 unique statements; 153 statements with two or more negations or "non … solo" audited three times (any false = disputed).
  - Audit failures: 29
- Disputed going into the fix rounds: 380

### Rounds

| Round | Disputed in | Resolved | Still disputed | Marker mismatch | Audit failed |
|---|---|---|---|---|---|
| 1 | 380 | 301 | 79 | 52 | 1 |
| 2 | 79 | 24 | 55 | 23 | 0 |
| 3 | 55 | 14 | 41 | 41 | 0 |
| 4 | 41 | 14 | 27 | 27 | 0 |

- Published ids: 6993 of 7020
- Unresolved ids (kept Italian in the app, listed in ar-unresolved.json): **27 (0.38%)**

## Manual decisions

- `u5787` Con la patente di categoria A si possono condurre i motocicli (con o senza carrozzetta) di qualsiasi cilindrata, purché abbiano una potenza inferiore a 35 kW per i primi 2 anni dal conseguimento  
  → برخصة السياقة (صنف A) يمكن قيادة الدراجات النارية (مع عربة جانبية أو بدونها) من أي سعة، شريطة أن تقل قدرتها عن 35 kW خلال السنتين (2) الأوليين من الحصول عليها  
  Arabic dual 'سنتين' (two years) kept, digit 2 added in brackets so numbers stay in Western digits
- `u5789` La patente di categoria A può essere conseguita con accesso graduale a 18 anni di età da chi è già titolare di patente A1 da almeno 2 anni  
  → يمكن الحصول على رخصة السياقة (صنف A) بالوصول التدريجي في سن 18 سنة لمن يحمل بالفعل رخصة السياقة A1 منذ سنتين (2) على الأقل  
  Arabic dual 'سنتين' (two years) kept, digit 2 added in brackets so numbers stay in Western digits
- `u5783` La patente di categoria A può essere conseguita, con accesso diretto, da chi non è già titolare di patente A2 da almeno 2 anni, solo se ha compiuto 24 anni di età  
  → يمكن الحصول على رخصة السياقة (صنف A) بالوصول المباشر، لمن لا يحمل رخصة السياقة A2 منذ سنتين (2) على الأقل، فقط إذا بلغ 24 سنة  
  Arabic dual 'سنتين' (two years) kept, digit 2 added in brackets so numbers stay in Western digits
- `u5784` La patente di categoria A può essere conseguita a 20 anni di età, con accesso graduale, da chi è titolare di patente A2 da almeno 2 anni  
  → يمكن الحصول على رخصة السياقة (صنف A) في سن 20 سنة، بالوصول التدريجي، لمن يحمل رخصة السياقة A2 منذ سنتين (2) على الأقل  
  Arabic dual 'سنتين' (two years) kept, digit 2 added in brackets so numbers stay in Western digits
- `u5791` La patente di categoria A può essere conseguita con accesso diretto anche da chi non è già titolare di patente A2 da almeno 2 anni, purché abbia compiuto 21 anni di età  
  → يمكن الحصول على رخصة السياقة (صنف A) بالوصول المباشر أيضًا لمن لا يحمل رخصة السياقة A2 منذ سنتين (2) على الأقل، شريطة أن يكون قد بلغ 21 سنة  
  Arabic dual 'سنتين' (two years) kept, digit 2 added in brackets so numbers stay in Western digits

Source remarks (typos in the Italian, translated literally): 15 statements, see source-issues.md.
