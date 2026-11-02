# Ukrainian (uk) — translation QA report

## 1. Automatic checks

- Entries: 7020 (expected 7020)
- Unknown ids: 0
- Empty texts: 0
- Statements whose source numbers are missing in the translation: 1
- Italian leftovers outside brackets (names and abbreviations excluded): 0
  - q-19941: ["numbers missing in translation: ['24']"]

## 2. Blind back-translation sample

150 random question ids, back-translated into Italian by a model that never saw the source, then compared by an independent judge (meaning, negations, limiters, numbers, conditions) and by the automatic marker comparison.

- Discrepant ids: **12 of 150 (8.0%)**
- All discrepancies were sent to the fix loop; resolved: 12 of 12 statements

  - `u3038` Le luci rosse accese lampeggianti in figura obbligano a non superare la striscia trasversale d'arresto  
    before: Увімкнені червоні миготливі вогні, зображені на малюнку, зобов'язують не перетинати поперечну лінію зупинки  
    after: Увімкнені миготливі червоні вогні на малюнку зобов'язують не переїжджати поперечну стоп-лінію  
    problems: back-translation: negation: source has 0, back-translation has 1; back-translation: atmost: source ['ATMOST'] vs back-translation []
  - `u3800` Il conducente deve fermarsi per concedere la precedenza al pedone sordocieco che, con il bastone bianco-rosso, attraversa la strada fuori dalle strisce pedonali  
    before: Водій повинен зупинитися, щоб дати дорогу глухонімому незрячому пішоходу, який з біло-червоною тростиною переходить дорогу поза пішохідним переходом  
    after: Водій повинен зупинитися, щоб дати дорогу сліпоглухому пішоходу, який з біло-червоною тростиною переходить дорогу поза пішохідним переходом  
    problems: meaning_identical = false; sordocieco (deaf-blind) rendered as "глухонімому незрячому" (deaf-mute blind), adds muteness; back-translation: negation: source has 0, back-translation has 1
  - `u4162` E' obbligatorio ridurre la velocità e all'occorrenza fermarsi quando i pedoni, che sono sul percorso, tardano a scansarsi  
    before: Зменшувати швидкість і за потреби зупинятися, коли пішоходи, що знаходяться на шляху, повільно звільняють дорогу, обов'язково  
    after: Обов'язково знижувати швидкість і за потреби зупинятися, коли пішоходи, які перебувають на шляху руху, зволікають і не відходять убік  
    problems: back-translation: if: source [] vs back-translation ['se']
  - `u4345` Nel caso in cui, per un guasto alla propria autovettura, si rimane bloccati sulla sede ferroviaria di un passaggio a livello, occorre svuotare rapidamente il serbatoio per evitare incendi in caso di collisione col treno  
    before: Якщо через несправність власного легкового автомобіля ви залишилися заблокованими на залізничному полотні залізничного переїзду, слід швидко спорожнити бак, щоб уникнути пожежі у разі зіткнення з потягом  
    after: У разі, коли через несправність власного легкового автомобіля ви застрягли на коліях залізничного переїзду, потрібно швидко спорожнити паливний бак, щоб уникнути пожежі в разі зіткнення з потягом  
    problems: back-translation: if: source [] vs back-translation ['se']
  - `u4350` Nel caso in cui un veicolo rimanga fermo tra le barriere chiuse del passaggio a livello, unico obbligo del conducente è quello di spegnere il motore e invitare eventuali passeggeri a scendere dal veicolo  
    before: Якщо транспортний засіб зупинився між опущеними шлагбаумами залізничного переїзду, єдиний обов'язок водія полягає в тому, щоб вимкнути двигун і запропонувати можливим пасажирам вийти з транспортного засобу  
    after: У разі, коли транспортний засіб залишається нерухомим між закритими шлагбаумами залізничного переїзду, єдиним обов'язком водія є заглушити двигун і запропонувати пасажирам, якщо вони є, вийти з транспортного засобу  
    problems: back-translation: if: source [] vs back-translation ['se']
  - `u4580` Quando ad un incrocio urbano, al segnale di via libera, il veicolo che precede tarda a riprendere la marcia, è opportuno suonare insistentemente per sollecitare il conducente a rimettersi in moto  
    before: Коли на міському перехресті, за сигналом дозволу руху, транспортний засіб, що їде попереду, не поспішає рушати, доцільно наполегливо сигналити, щоб підганяти водія рушати  
    after: Коли на перехресті в населеному пункті, при сигналі, що дозволяє рух, транспортний засіб попереду зволікає з відновленням руху, доцільно наполегливо сигналити, щоб спонукати водія рушити  
    problems: back-translation: negation: source has 0, back-translation has 1
  - `u4582` Quando ad un incrocio urbano, al segnale di via libera, il veicolo che precede tarda a riprendere la marcia, è opportuno tirare il freno a mano e scendere per cercare un agente del traffico che prenda i dovuti provvedimenti  
    before: Коли на міському перехресті, за сигналом дозволу руху, транспортний засіб, що їде попереду, не поспішає рушати, доцільно потягнути ручне гальмо і вийти шукати регулювальника, який вжив би необхідних заходів  
    after: Коли на перехресті в населеному пункті, при сигналі, що дозволяє рух, транспортний засіб попереду зволікає з відновленням руху, доцільно затягнути стоянкове гальмо і вийти, щоб знайти регулювальника, який вжив би належних заходів  
    problems: back-translation: negation: source has 0, back-translation has 1
  - `u4694` Di norma, è consentito viaggiare per file parallele lungo il tratto di strada che porta ad un incrocio regolato da agenti del traffico  
    before: Як правило, дозволено їхати в кілька паралельних рядів ділянкою дороги, що веде до перехрестя, регульованого регулювальниками  
    after: Як правило, дозволено рухатися паралельними рядами на ділянці дороги, що веде до перехрестя, рух на якому регулюють регулювальники  
    problems: back-translation: more: source [] vs back-translation ['più']
  - `u4695` In condizioni di traffico intenso su carreggiata a senso unico a tre corsie, come in figura, è consentito viaggiare per file parallele  
    before: За умов інтенсивного руху на проїзній частині з одностороннім рухом і трьома смугами, як на малюнку, дозволено їхати в кілька паралельних рядів  
    after: В умовах інтенсивного руху на проїзній частині з одностороннім рухом із трьома смугами руху, як на малюнку, дозволено рухатися паралельними рядами  
    problems: back-translation: more: source [] vs back-translation ['più']
  - `u4696` Percorrendo una carreggiata a senso unico la svolta a sinistra si effettua immettendosi in una corsia qualsiasi, se si viaggia per file parallele  
    before: Рухаючись проїзною частиною з одностороннім рухом, поворот ліворуч виконують, виїжджаючи на будь-яку смугу, якщо рухаються в кілька паралельних рядів  
    after: Під час руху проїзною частиною з одностороннім рухом поворот ліворуч виконують, виїжджаючи на будь-яку смугу руху, якщо рух відбувається паралельними рядами  
    problems: back-translation: more: source [] vs back-translation ['più']
  - `u5143` La sosta è vietata se si impedisce l'accesso ad altro veicolo già regolarmente in sosta  
    before: Стоянка заборонена, якщо вона перешкоджає виїзду іншого транспортного засобу, що вже правильно стоїть  
    after: Стоянка заборонена, якщо це перешкоджає доступу до іншого транспортного засобу, який уже правомірно стоїть на стоянці  
    problems: meaning_identical = false; "impedisce l accesso ad altro veicolo" (blocks access to another vehicle) rendered as "перешкоджає виїзду" (blocks the exit/leaving of another vehicle)
  - `u6719` Le norme di circolazione sono stabilite per garantire una maggior sicurezza di guida per tutti gli utenti della strada  
    before: Правила дорожнього руху встановлені для забезпечення більшої безпеки руху для всіх учасників дорожнього руху  
    after: Правила дорожнього руху встановлено для забезпечення більшої безпеки керування для всіх учасників дорожнього руху  
    problems: back-translation: more: source [] vs back-translation ['maggiore']

## 3. Negation and limiter pass

Every statement with non / solo / soltanto / sempre / mai: 1124 unique statements (1144 ids), checked by an adversarial auditor.

- Flagged: 16

## Fix rounds

- Round 1: 29 in, 27 resolved, 2 left
- Round 2: 2 in, 0 resolved, 2 left
- Round 3: 2 in, 1 resolved, 1 left

Remaining flagged after all rounds: 0

## Manual decisions

- `u3877` La striscia di mezzo in figura non consente il sorpasso in ogni caso  
  → Середня лінія на малюнку в жодному разі не дозволяє обгін  
  'у кожному випадку' could read as 'not in every case'; aligned with the ministry's official French 'n'autorise en aucun cas' (in no case)
- `u2403` Lungo le strade dove è posto, il segnale raffigurato vale 24 ore su 24  
  → Уздовж доріг, де він встановлений, зображений на малюнку знак діє 24 години на добу  
  '24 ore su 24' is the idiom 'round the clock'; '24 години на добу' keeps the meaning, the number check only expected the digit 24 twice

Source remarks (typos in the Italian, translated literally): 15 statements, see source-issues.md.
