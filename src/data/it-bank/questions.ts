/**
 * The Italian seed bank, generated from the ministerial listato.
 *
 * Real questions, not invented ones: scripts/make_seed.py takes the parsed
 * listato and keeps the statements that stand without a picture, a few from
 * every argomento. The seed ships no media, so anything that says "il segnale
 * raffigurato" is excluded — it would be unanswerable here.
 *
 * This is demo content in the sense that it is a subset; the full bank arrives
 * through content.json and replaces it wholesale. What it has to get right is
 * the format, so the paper generator and the VERO/FALSO screens are exercised
 * for real before the whole listato is reachable.
 *
 * Generated file — edit scripts/make_seed.py, not this.
 */
import type { Question } from '@/types/content';

/** [id, text, correct, topicId, sourceRef] — the options are always VERO/FALSO. */
type Row = [string, string, 'V' | 'F', string, string];

const ROWS: Row[] = [
  ['q-21194', 'Il suono prolungato del fischietto da parte dell\'agente preposto al traffico significa che tutti i veicoli si devono arrestare, in condizioni di sicurezza', 'V', 'segnalazioni-semaforiche', 'Listato MIT, quesito n° 4263, domanda 21194'],
  ['q-21195', 'Il suono prolungato del fischietto da parte dell\'agente preposto al traffico serve per consentire il passaggio di veicoli di soccorso in servizio di emergenza', 'V', 'segnalazioni-semaforiche', 'Listato MIT, quesito n° 4263, domanda 21195'],
  ['q-21196', 'Il suono prolungato del fischietto da parte dell\'agente preposto al traffico impone a chi ha impegnato l\'incrocio di liberarlo ed eventualmente di arrestarsi subito dopo', 'V', 'segnalazioni-semaforiche', 'Listato MIT, quesito n° 4263, domanda 21196'],
  ['q-21197', 'Il suono prolungato del fischietto da parte dell\'agente preposto al traffico indica che occorre arrestarsi, se non si è ancora occupato l\'incrocio', 'V', 'segnalazioni-semaforiche', 'Listato MIT, quesito n° 4263, domanda 21197'],
  ['q-21198', 'Il suono prolungato del fischietto da parte dell\'agente preposto al traffico indica che occorre tornare indietro', 'F', 'segnalazioni-semaforiche', 'Listato MIT, quesito n° 4263, domanda 21198'],
  ['q-21199', 'Il suono prolungato del fischietto da parte dell\'agente preposto al traffico serve per arrestare o deviare solo i veicoli che arrivano dalla sua destra', 'F', 'segnalazioni-semaforiche', 'Listato MIT, quesito n° 4263, domanda 21199'],
  ['q-20719', 'Le strisce lungo il centro della carreggiata possono essere superate se discontinue (tratteggiate)', 'V', 'segnaletica-orizzontale', 'Listato MIT, quesito n° 4211, domanda 20719'],
  ['q-20720', 'Le strisce lungo il centro della carreggiata non possono essere superate se continue', 'V', 'segnaletica-orizzontale', 'Listato MIT, quesito n° 4211, domanda 20720'],
  ['q-20723', 'Le strisce lungo il centro della carreggiata possono essere bianche o azzurre', 'F', 'segnaletica-orizzontale', 'Listato MIT, quesito n° 4211, domanda 20723'],
  ['q-20842', 'E\' regolamentare, nelle zone destinate alla fermata degli autobus in servizio pubblico di linea, trovare sulla pavimentazione la scritta BUS di colore giallo', 'V', 'segnaletica-orizzontale', 'Listato MIT, quesito n° 4226, domanda 20842'],
  ['q-20843', 'E\' regolamentare trovare sulla pavimentazione la scritta TAXI di colore giallo, per indicare zone riservate alla sosta dei taxi in servizio', 'V', 'segnaletica-orizzontale', 'Listato MIT, quesito n° 4226, domanda 20843'],
  ['q-20844', 'E\' regolamentare trovare sulla pavimentazione la scritta STOP, a completamento del relativo segnale verticale', 'V', 'segnaletica-orizzontale', 'Listato MIT, quesito n° 4226, domanda 20844'],
  ['q-18341', 'L\'attraversamento pedonale viene segnalato con strisce bianche parallele', 'V', 'definizioni-stradali-e-di-traffico', 'Listato MIT, quesito n° 4004, domanda 18341'],
  ['q-18342', 'L\'attraversamento pedonale è una parte della carreggiata sulla quale è vietata la fermata dei veicoli', 'V', 'definizioni-stradali-e-di-traffico', 'Listato MIT, quesito n° 4004, domanda 18342'],
  ['q-18343', 'L\'attraversamento pedonale è una parte della carreggiata, in cui i veicoli devono dare la precedenza ai pedoni, che attraversano sulle apposite strisce', 'V', 'definizioni-stradali-e-di-traffico', 'Listato MIT, quesito n° 4004, domanda 18343'],
  ['q-18344', 'L\'attraversamento pedonale è una parte della carreggiata destinata al transito dei pedoni che attraversano', 'V', 'definizioni-stradali-e-di-traffico', 'Listato MIT, quesito n° 4004, domanda 18344'],
  ['q-18345', 'L\'attraversamento pedonale è una parte della carreggiata sulla quale è vietata la sosta dei veicoli', 'V', 'definizioni-stradali-e-di-traffico', 'Listato MIT, quesito n° 4004, domanda 18345'],
  ['q-18346', 'L\'attraversamento pedonale è una parte della strada, separata dalla carreggiata mediante una striscia gialla', 'F', 'definizioni-stradali-e-di-traffico', 'Listato MIT, quesito n° 4004, domanda 18346'],
  ['q-22672', 'E\' vietato, in quanto costituisce pericolo o intralcio per la circolazione, tenersi sul margine sinistro della carreggiata per svoltare in una strada a destra', 'V', 'norme-sulla-circol-dei-veicoli', 'Listato MIT, quesito n° 4410, domanda 22672'],
  ['q-22673', 'E\' vietato, in quanto costituisce pericolo o intralcio per la circolazione, sostare sui binari tramviari', 'V', 'norme-sulla-circol-dei-veicoli', 'Listato MIT, quesito n° 4410, domanda 22673'],
  ['q-22674', 'E\' vietato, in quanto costituisce pericolo o intralcio per la circolazione, effettuare un cambiamento di direzione senza segnalare la manovra con sufficiente anticipo', 'V', 'norme-sulla-circol-dei-veicoli', 'Listato MIT, quesito n° 4410, domanda 22674'],
  ['q-22675', 'E\' vietato, in quanto costituisce pericolo o intralcio per la circolazione, gareggiare in velocità', 'V', 'norme-sulla-circol-dei-veicoli', 'Listato MIT, quesito n° 4410, domanda 22675'],
  ['q-22676', 'E\' vietato, in quanto costituisce pericolo o intralcio per la circolazione, circolare a velocità troppo bassa senza giustificato motivo', 'V', 'norme-sulla-circol-dei-veicoli', 'Listato MIT, quesito n° 4410, domanda 22676'],
  ['q-22677', 'E\' vietato, in quanto costituisce pericolo o intralcio per la circolazione, immettersi nel flusso della circolazione provenendo da strade laterali', 'F', 'norme-sulla-circol-dei-veicoli', 'Listato MIT, quesito n° 4410, domanda 22677'],
  ['q-23805', 'Nel caso di ingombro della carreggiata per caduta accidentale del carico il conducente deve provvedere a rimuovere il carico, se possibile', 'V', 'ingombro-della-carreggiata', 'Listato MIT, quesito n° 4530, domanda 23805'],
  ['q-23806', 'Su strada extraurbana, nel caso di ingombro della carreggiata per caduta accidentale del carico, il conducente deve presegnalare l\'ostacolo mediante il segnale di veicolo fermo (triangolo)', 'V', 'ingombro-della-carreggiata', 'Listato MIT, quesito n° 4530, domanda 23806'],
  ['q-23807', 'Nel caso di ingombro della carreggiata per caduta accidentale del carico il conducente deve rendere sollecitamente libero, per quanto possibile, il transito', 'V', 'ingombro-della-carreggiata', 'Listato MIT, quesito n° 4530, domanda 23807'],
  ['q-23808', 'Nel caso di ingombro della carreggiata per caduta accidentale del carico il conducente deve presegnalare l\'ostacolo mediante il segnale di STOP', 'F', 'ingombro-della-carreggiata', 'Listato MIT, quesito n° 4530, domanda 23808'],
  ['q-23809', 'Nel caso di ingombro della carreggiata per caduta accidentale del carico il conducente deve restare a bordo del veicolo in attesa dei soccorsi principali; trasporto di persone; carico dei veicoli; pannelli sui veicoli; traino dei veicoli e dei veicoli in avaria; traino dei rimorchi', 'F', 'ingombro-della-carreggiata', 'Listato MIT, quesito n° 4530, domanda 23809'],
  ['q-23810', 'In caso di ingombro della carreggiata per avaria del veicolo, il conducente deve sollecitamente rendere libero il transito per il traffico sopraggiungente', 'V', 'ingombro-della-carreggiata', 'Listato MIT, quesito n° 4531, domanda 23810'],
  ['q-24141', 'Nelle autostrade e strade extraurbane, è obbligatorio accendere i fari anabbaglianti anche di giorno o, in alternativa, le luci di marcia diurna', 'V', 'uso-delle-luci', 'Listato MIT, quesito n° 4571, domanda 24141'],
  ['q-24142', 'L\'errata impostazione dell\'orientamento dei proiettori può ridurre la visibilità del conducente o abbagliare gli altri utenti', 'V', 'uso-delle-luci', 'Listato MIT, quesito n° 4571, domanda 24142'],
  ['q-24143', 'Proiettori anabbaglianti male orientati possono abbagliare gli altri utenti della strada', 'V', 'uso-delle-luci', 'Listato MIT, quesito n° 4571, domanda 24143'],
  ['q-24144', 'Pur avendo acceso le luci anabbaglianti, si corre il rischio di abbagliare gli altri se le lampade sono montate in maniera errata o non sono omologate', 'V', 'uso-delle-luci', 'Listato MIT, quesito n° 4571, domanda 24144'],
  ['q-24145', 'Su un veicolo a motore non è consentito utilizzare lampade non omologate', 'V', 'uso-delle-luci', 'Listato MIT, quesito n° 4571, domanda 24145'],
  ['q-24146', 'Percorrendo una strada extraurbana durante una giornata assolata è sufficiente accendere le luci di posizione', 'F', 'uso-delle-luci', 'Listato MIT, quesito n° 4571, domanda 24146'],
  ['q-22270', 'Il conducente deve regolare la velocità in relazione alle caratteristiche del veicolo', 'V', 'limiti-di-velocita', 'Listato MIT, quesito n° 4374, domanda 22270'],
  ['q-22271', 'Il conducente deve regolare la velocità in relazione allo stato del veicolo', 'V', 'limiti-di-velocita', 'Listato MIT, quesito n° 4374, domanda 22271'],
  ['q-22272', 'Il conducente deve regolare la velocità in relazione al carico del veicolo', 'V', 'limiti-di-velocita', 'Listato MIT, quesito n° 4374, domanda 22272'],
  ['q-22273', 'Il conducente deve regolare la velocità in relazione alle caratteristiche della strada', 'V', 'limiti-di-velocita', 'Listato MIT, quesito n° 4374, domanda 22273'],
  ['q-22274', 'Il conducente deve regolare la velocità in relazione alle condizioni della strada', 'V', 'limiti-di-velocita', 'Listato MIT, quesito n° 4374, domanda 22274'],
  ['q-22275', 'Il conducente deve regolare la velocità in relazione alle condizioni del traffico', 'V', 'limiti-di-velocita', 'Listato MIT, quesito n° 4374, domanda 22275'],
  ['q-22527', 'Il rispetto della distanza di sicurezza evita la collisione con il veicolo che precede', 'V', 'distanza-di-sicurezza', 'Listato MIT, quesito n° 4394, domanda 22527'],
  ['q-22528', 'Il conducente deve valutare la distanza di sicurezza anche sulla base della velocità del veicolo di cui è alla guida', 'V', 'distanza-di-sicurezza', 'Listato MIT, quesito n° 4394, domanda 22528'],
  ['q-22529', 'Il conducente deve commisurare la distanza di sicurezza anche in base alla propria prontezza di riflessi', 'V', 'distanza-di-sicurezza', 'Listato MIT, quesito n° 4394, domanda 22529'],
  ['q-22530', 'Il valore della distanza di sicurezza deve essere stabilito anche in base alle condizioni del traffico', 'V', 'distanza-di-sicurezza', 'Listato MIT, quesito n° 4394, domanda 22530'],
  ['q-22531', 'Il valore della distanza di sicurezza deve essere stabilito anche in base all\'andamento planoaltimetrico della strada', 'V', 'distanza-di-sicurezza', 'Listato MIT, quesito n° 4394, domanda 22531'],
  ['q-22532', 'Il valore della distanza di sicurezza deve essere stabilito anche in base alle condizioni atmosferiche', 'V', 'distanza-di-sicurezza', 'Listato MIT, quesito n° 4394, domanda 22532'],
  ['q-23457', 'Il conducente che intende sorpassare deve accertarsi che la visibilità sia tale da consentire la manovra', 'V', 'norme-sul-sorpasso', 'Listato MIT, quesito n° 4497, domanda 23457'],
  ['q-23458', 'Il conducente che intende sorpassare deve accertarsi che la manovra possa compiersi senza costituire intralcio', 'V', 'norme-sul-sorpasso', 'Listato MIT, quesito n° 4497, domanda 23458'],
  ['q-23459', 'Il conducente che intende sorpassare deve accertarsi che il conducente che lo precede nella stessa corsia non abbia segnalato di voler compiere analoga manovra', 'V', 'norme-sul-sorpasso', 'Listato MIT, quesito n° 4497, domanda 23459'],
  ['q-23460', 'Il conducente che intende sorpassare deve accertarsi che il conducente che lo segue sulla stessa carreggiata non abbia iniziato il sorpasso', 'V', 'norme-sul-sorpasso', 'Listato MIT, quesito n° 4497, domanda 23460'],
  ['q-23461', 'Il conducente che intende sorpassare deve accertarsi che la strada sia libera per consentire la completa esecuzione del sorpasso', 'V', 'norme-sul-sorpasso', 'Listato MIT, quesito n° 4497, domanda 23461'],
  ['q-23462', 'Il conducente che intende sorpassare deve valutare lo spazio necessario per la manovra anche in relazione alla differenza di velocità tra il proprio veicolo e quello da sorpassare', 'V', 'norme-sul-sorpasso', 'Listato MIT, quesito n° 4497, domanda 23462'],
  ['q-23614', 'Se si parcheggia in una zona regolamentata con parchimetro, occorre esporre l\'apposito tagliando, in modo che sia ben visibile', 'V', 'fermata-sosta-arresto-e-partenza', 'Listato MIT, quesito n° 4507, domanda 23614'],
  ['q-23615', 'Per parcheggiare in una zona regolamentata mediante disco orario, bisogna esporre in modo ben visibile l\'orario di arrivo', 'V', 'fermata-sosta-arresto-e-partenza', 'Listato MIT, quesito n° 4507, domanda 23615'],
  ['q-23616', 'In una zona in cui la sosta è regolamentata con parchimetro, non occorre utilizzarlo se ci si ferma soltanto per far salire o scendere un passeggero', 'V', 'fermata-sosta-arresto-e-partenza', 'Listato MIT, quesito n° 4507, domanda 23616'],
  ['q-23617', 'Nelle aree di parcheggio a tempo limitato, i veicoli al servizio di persone diversamente abili non sono obbligati a rispettare il limite di tempo stabilito per la sosta.', 'V', 'fermata-sosta-arresto-e-partenza', 'Listato MIT, quesito n° 4507, domanda 23617'],
  ['q-23618', 'Per parcheggiare in una zona regolamentata mediante disco orario, bisogna indicare sul disco l\'orario di fine della sosta, oppure trascriverlo su un foglio di carta', 'F', 'fermata-sosta-arresto-e-partenza', 'Listato MIT, quesito n° 4507, domanda 23618'],
  ['q-23619', 'In una zona in cui la sosta è regolamentata mediante disco orario, prima che scada il tempo di validità della sosta è consentito aggiornare l\'orario, senza che il veicolo venga spostato', 'F', 'fermata-sosta-arresto-e-partenza', 'Listato MIT, quesito n° 4507, domanda 23619'],
  ['q-24318', 'Sono previste sanzioni per chi, pur facendo uso della cintura di sicurezza, ne alteri o ostacoli il normale funzionamento', 'V', 'dispositivi-di-equipaggiamento-funzione-ed-uso', 'Listato MIT, quesito n° 4593, domanda 24318'],
  ['q-24319', 'Se non si allaccia la cintura di sicurezza, in caso d\'improvvisa frenata si può essere proiettati contro il parabrezza', 'V', 'dispositivi-di-equipaggiamento-funzione-ed-uso', 'Listato MIT, quesito n° 4593, domanda 24319'],
  ['q-24320', 'Se il veicolo è dotato di airbag frontali e laterali, si può fare a meno di allacciare la cintura di sicurezza', 'F', 'dispositivi-di-equipaggiamento-funzione-ed-uso', 'Listato MIT, quesito n° 4593, domanda 24320'],
  ['q-24321', 'Le cinture di sicurezza vanno agganciate solo se si circola a velocità uguale o superiore a 30 km/h abbigliamento di sicurezza', 'F', 'dispositivi-di-equipaggiamento-funzione-ed-uso', 'Listato MIT, quesito n° 4593, domanda 24321'],
  ['q-24322', 'Nei veicoli dotati di airbag con comando di disabilitazione, prima di sistemare sul sedile anteriore un seggiolino per bambini (schienale rivolto verso il parabrezza), bisogna disattivare l\'airbag', 'V', 'dispositivi-di-equipaggiamento-funzione-ed-uso', 'Listato MIT, quesito n° 4594, domanda 24322'],
  ['q-24323', 'Nei veicoli che non sono muniti del comando per disabilitare l\'airbag dal lato passeggero, il seggiolino per bambini non deve essere sistemato sul sedile anteriore, con lo schienale rivolto verso la strada', 'V', 'dispositivi-di-equipaggiamento-funzione-ed-uso', 'Listato MIT, quesito n° 4594, domanda 24323'],
  ['q-24457', 'E\' vietato condurre un autoveicolo sulle strade pubbliche quando non si possiede la patente di guida necessaria per quel tipo di veicolo', 'V', 'patenti-di-guida', 'Listato MIT, quesito n° 4605, domanda 24457'],
  ['q-24458', 'E\' di norma vietato condurre sulle strade pubbliche un autoveicolo non immatricolato', 'V', 'patenti-di-guida', 'Listato MIT, quesito n° 4605, domanda 24458'],
  ['q-24459', 'E\' vietato utilizzare un autoveicolo sulle strade pubbliche quando non si ha con sé la ricevuta di avvenuto pagamento della tassa di possesso', 'F', 'patenti-di-guida', 'Listato MIT, quesito n° 4605, domanda 24459'],
  ['q-24460', 'E\' vietato circolare sulle strade pubbliche con un autoveicolo dotato della targa prova', 'F', 'patenti-di-guida', 'Listato MIT, quesito n° 4605, domanda 24460'],
  ['q-24461', 'E\' vietato utilizzare un autoveicolo sulle strade pubbliche quando la carta di circolazione è intestata a persona diversa dal conducente', 'F', 'patenti-di-guida', 'Listato MIT, quesito n° 4605, domanda 24461'],
  ['q-24462', 'Sulle strade pubbliche è vietato utilizzare un autoveicolo se la garanzia è scaduta di validità', 'F', 'patenti-di-guida', 'Listato MIT, quesito n° 4605, domanda 24462'],
  ['q-24697', 'Causa probabile di incidenti dovuti alla struttura della strada può essere ristrettezza della strada', 'V', 'comportamenti-per-prevenire-incidenti-stradali', 'Listato MIT, quesito n° 4623, domanda 24697'],
  ['q-24698', 'Causa probabile di incidenti dovuti alla struttura della strada può essere mancata segnalazione degli incroci', 'V', 'comportamenti-per-prevenire-incidenti-stradali', 'Listato MIT, quesito n° 4623, domanda 24698'],
  ['q-24699', 'Causa probabile di incidenti dovuti alla struttura della strada può essere mancanza di segnaletica orizzontale', 'V', 'comportamenti-per-prevenire-incidenti-stradali', 'Listato MIT, quesito n° 4623, domanda 24699'],
  ['q-24700', 'Causa probabile di incidenti dovuti alla struttura della strada può essere fondo stradale deformato', 'V', 'comportamenti-per-prevenire-incidenti-stradali', 'Listato MIT, quesito n° 4623, domanda 24700'],
  ['q-24701', 'Causa probabile di incidenti dovuti alla struttura della strada può essere fondo stradale scivoloso', 'V', 'comportamenti-per-prevenire-incidenti-stradali', 'Listato MIT, quesito n° 4623, domanda 24701'],
  ['q-24702', 'Causa probabile di incidenti dovuti alla struttura della strada può essere presenza di strettoie non segnalate', 'V', 'comportamenti-per-prevenire-incidenti-stradali', 'Listato MIT, quesito n° 4623, domanda 24702'],
  ['q-24827', 'E\' opportuno, per il conducente che accusa segni di stanchezza, raggiungere la più vicina piazzola di sosta e riposare', 'V', 'guida-in-relazione-alle-qualita-e-condizioni-fisiche-e-psichiche', 'Listato MIT, quesito n° 4636, domanda 24827'],
  ['q-24828', 'E\' opportuno, per il conducente che accusa segni di stanchezza, avvicinarsi il più possibile al veicolo che lo precede nella marcia', 'F', 'guida-in-relazione-alle-qualita-e-condizioni-fisiche-e-psichiche', 'Listato MIT, quesito n° 4636, domanda 24828'],
  ['q-24829', 'E\' necessario che trascorrano alcune ore affinché un conducente che abbia assunto una quantità eccessiva di bevande alcoliche recuperi l\'idoneità alla guida', 'V', 'guida-in-relazione-alle-qualita-e-condizioni-fisiche-e-psichiche', 'Listato MIT, quesito n° 4637, domanda 24829'],
  ['q-24830', 'Un conducente che ha assunto una quantità eccessiva di bevande alcoliche non può recuperare velocemente l\'idoneità alla guida, specie se ha assunto anche dei farmaci', 'V', 'guida-in-relazione-alle-qualita-e-condizioni-fisiche-e-psichiche', 'Listato MIT, quesito n° 4637, domanda 24830'],
  ['q-24831', 'Un conducente che ha assunto una quantità eccessiva di bevande alcoliche può recuperare velocemente l\'idoneità alla guida se assume cibi piuttosto salati', 'F', 'guida-in-relazione-alle-qualita-e-condizioni-fisiche-e-psichiche', 'Listato MIT, quesito n° 4637, domanda 24831'],
  ['q-24832', 'Un conducente che ha assunto una quantità eccessiva di bevande alcoliche può recuperare velocemente l\'idoneità alla guida se assume caffè amaro', 'F', 'guida-in-relazione-alle-qualita-e-condizioni-fisiche-e-psichiche', 'Listato MIT, quesito n° 4637, domanda 24832'],
  ['q-24968', 'Chi è civilmente obbligato a risarcire i danni provocati da un sinistro stradale si libera dall\'obbligo se risarcisce il danneggiato', 'V', 'responsabilita-civile-penale-amministrativa', 'Listato MIT, quesito n° 4657, domanda 24968'],
  ['q-24969', 'Chi è civilmente obbligato a risarcire i danni provocati da un sinistro stradale può accordarsi con il danneggiato circa il valore del risarcimento', 'V', 'responsabilita-civile-penale-amministrativa', 'Listato MIT, quesito n° 4657, domanda 24969'],
  ['q-24970', 'Chi è civilmente obbligato a risarcire i danni provocati da un sinistro stradale può far riparare il proprio autoveicolo', 'V', 'responsabilita-civile-penale-amministrativa', 'Listato MIT, quesito n° 4657, domanda 24970'],
  ['q-24971', 'Chi è civilmente obbligato a risarcire i danni provocati da un sinistro stradale può farsi assistere da un consulente d\'infortunistica stradale', 'V', 'responsabilita-civile-penale-amministrativa', 'Listato MIT, quesito n° 4657, domanda 24971'],
  ['q-24972', 'Chi è civilmente obbligato a risarcire i danni provocati da un sinistro stradale può, in alternativa, chiedere che la propria patente di guida sia revocata', 'F', 'responsabilita-civile-penale-amministrativa', 'Listato MIT, quesito n° 4657, domanda 24972'],
  ['q-24973', 'Chi è civilmente obbligato a risarcire i danni provocati da un sinistro stradale si libera da ogni forma di responsabilità penale pagandone l\'ammontare del danno', 'F', 'responsabilita-civile-penale-amministrativa', 'Listato MIT, quesito n° 4657, domanda 24973'],
  ['q-25065', 'Gli apparecchi e i dispositivi che funzionano a corrente elettrica (radio, luci, lunotto termico, ecc.) fanno aumentare i consumi di carburante del veicolo', 'V', 'limitazione-dei-consumi', 'Listato MIT, quesito n° 4671, domanda 25065'],
  ['q-25066', 'Mantenendo il più possibile costante la velocità, si riduce il consumo di carburante', 'V', 'limitazione-dei-consumi', 'Listato MIT, quesito n° 4671, domanda 25066'],
  ['q-25067', 'Il consumo di carburante aumenta con l\'aumentare del peso del veicolo', 'V', 'limitazione-dei-consumi', 'Listato MIT, quesito n° 4671, domanda 25067'],
  ['q-25068', 'Diminuendo opportunamente la velocità diminuisce il consumo di carburante', 'V', 'limitazione-dei-consumi', 'Listato MIT, quesito n° 4671, domanda 25068'],
  ['q-25069', 'Per consumare meno carburante è opportuno tenere i finestrini chiusi, specie quando si viaggia ad alta velocità', 'V', 'limitazione-dei-consumi', 'Listato MIT, quesito n° 4671, domanda 25069'],
  ['q-25070', 'Per consumare meno carburante conviene scegliere, per quanto possibile, strade pianeggianti e più scorrevoli', 'V', 'limitazione-dei-consumi', 'Listato MIT, quesito n° 4671, domanda 25070'],
  ['q-25168', 'La forza aderente consente il movimento del veicolo', 'V', 'elementi-costitutivi-del-veicolo-importanti-per-la-sicurezza', 'Listato MIT, quesito n° 4686, domanda 25168'],
  ['q-25169', 'La forza aderente si oppone allo slittamento verso l\'esterno della curva', 'V', 'elementi-costitutivi-del-veicolo-importanti-per-la-sicurezza', 'Listato MIT, quesito n° 4686, domanda 25169'],
  ['q-25170', 'La forza aderente consente al veicolo di percorrere la traiettoria voluta', 'V', 'elementi-costitutivi-del-veicolo-importanti-per-la-sicurezza', 'Listato MIT, quesito n° 4686, domanda 25170'],
  ['q-25171', 'La forza aderente si oppone allo slittamento dello pneumatico sull\'asfalto', 'V', 'elementi-costitutivi-del-veicolo-importanti-per-la-sicurezza', 'Listato MIT, quesito n° 4686, domanda 25171'],
  ['q-25172', 'La forza aderente non si oppone allo slittamento causato dal vento laterale', 'F', 'elementi-costitutivi-del-veicolo-importanti-per-la-sicurezza', 'Listato MIT, quesito n° 4686, domanda 25172'],
  ['q-25173', 'La forza aderente , se eccessiva, comporta il surriscaldamento dei freni', 'F', 'elementi-costitutivi-del-veicolo-importanti-per-la-sicurezza', 'Listato MIT, quesito n° 4686, domanda 25173'],
];

/** Every statement in the exam offers exactly these two, in this order. */
const OPTIONS = [{ id: 'V', text: 'Vero' }, { id: 'F', text: 'Falso' }];

export const IT_QUESTIONS: Question[] = ROWS.map(([id, text, correct, topicId, sourceRef]) => ({
  id,
  topicId,
  type: 'single_choice',
  text,
  options: OPTIONS,
  correctOptionId: correct,
  // The listato ships no explanations; they are written separately and
  // reach the app through content.json.
  explanation: '',
  mediaId: null,
  sourceMedia: null,
  subtopic: null,
  sourceRef,
  // No `category`: Italy has one class of question, not two.
  points: 1,
  licences: ['AM', 'A1', 'A2', 'A', 'B1', 'B', 'BE'],
}));
