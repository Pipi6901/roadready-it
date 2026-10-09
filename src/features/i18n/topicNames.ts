/**
 * Section names, per interface language.
 *
 * The names live here and not in content.json because the app shows them in
 * the INTERFACE language while the bundle carries only the ministry's Italian.
 * An id with no entry reads in Italian, which is the right fallback: that is
 * what the listato calls it.
 *
 * Italian is deliberately absent — it is already in the bundle.
 */
type TopicNames = Record<string, string>;

const EN: TopicNames = {
  'segnali-di-indicazione': 'Information signs',
  'segnali-di-obbligo': 'Mandatory signs',
  'pannelli-integrativi-dei-segnali': 'Supplementary panels',
  'segnali-complementari': 'Complementary and roadworks signs',
  'esempi-di-precedenza': 'Right of way at junctions',
  'segnalazioni-semaforiche': 'Traffic lights and police signals',
  'segnaletica-orizzontale': 'Road markings',
  'segnali-di-pericolo': 'Warning signs',
  'segnali-di-precedenza': 'Priority signs',
  'segnali-di-divieto': 'Prohibition signs',
  'definizioni-stradali-e-di-traffico': 'Road and traffic definitions',
  'norme-sulla-circol-dei-veicoli': 'Rules of the road',
  'ingombro-della-carreggiata': 'Obstructing the carriageway and motorways',
  'uso-delle-luci': 'Lights, horn and warning symbols',
  'limiti-di-velocita': 'Speed limits and level crossings',
  'distanza-di-sicurezza': 'Safe following distance',
  'norme-sul-sorpasso': 'Overtaking',
  'fermata-sosta-arresto-e-partenza': 'Stopping, parking and moving off',
  'dispositivi-di-equipaggiamento-funzione-ed-uso': 'Seat belts, child seats and helmets',
  'patenti-di-guida': 'Licences, documents and penalties',
  'comportamenti-per-prevenire-incidenti-stradali': 'Preventing and handling a crash',
  'guida-in-relazione-alle-qualita-e-condizioni-fisiche-e-psichiche': 'Fitness to drive and first aid',
  'responsabilita-civile-penale-amministrativa': 'Liability and insurance',
  'limitazione-dei-consumi': 'Fuel use and the environment',
  'elementi-costitutivi-del-veicolo-importanti-per-la-sicurezza': 'Vehicle parts and roadworthiness',
};

const TOPIC_NAMES: Record<string, TopicNames> = { en: EN };

/** The section's name in `locale`, falling back to the listato's Italian. */
export function topicName(locale: string, id: string, italian: string): string {
  return TOPIC_NAMES[locale]?.[id] ?? italian;
}
