/**
 * Section names, per interface language.
 *
 * The names live here and not in content.json because the app shows them in
 * the INTERFACE language while the bundle carries only the ministry's Italian.
 * An id with no entry reads in Italian, which is the right fallback: that is
 * what the listato calls it.
 *
 * These are navigation labels on the learn map, not translations of the
 * argomento's full title — short enough to fit under a node, and named the way
 * a driving school in that language names the chapter.
 *
 * Italian is deliberately absent: it is already in the bundle.
 */
type TopicNames = Record<string, string>;

const RO: TopicNames = {
  'segnali-di-indicazione': 'Indicatoare de orientare',
  'segnali-di-obbligo': 'Indicatoare de obligare',
  'pannelli-integrativi-dei-segnali': 'Panouri adiționale',
  'segnali-complementari': 'Indicatoare complementare și de lucrări',
  'esempi-di-precedenza': 'Prioritatea la intersecții',
  'segnalazioni-semaforiche': 'Semafoare și semnalele agentului',
  'segnaletica-orizzontale': 'Marcaje rutiere',
  'segnali-di-pericolo': 'Indicatoare de avertizare',
  'segnali-di-precedenza': 'Indicatoare de prioritate',
  'segnali-di-divieto': 'Indicatoare de interzicere',
  'definizioni-stradali-e-di-traffico': 'Definiții rutiere și de trafic',
  'norme-sulla-circol-dei-veicoli': 'Reguli de circulație',
  'ingombro-della-carreggiata': 'Ocuparea carosabilului și autostrăzile',
  'uso-delle-luci': 'Lumini, claxon și semnale',
  'limiti-di-velocita': 'Limite de viteză și treceri la nivel',
  'distanza-di-sicurezza': 'Distanța de siguranță',
  'norme-sul-sorpasso': 'Depășirea',
  'fermata-sosta-arresto-e-partenza': 'Oprirea, staționarea și plecarea',
  'dispositivi-di-equipaggiamento-funzione-ed-uso': 'Centuri, scaune pentru copii și căști',
  'patenti-di-guida': 'Permise, documente și sancțiuni',
  'comportamenti-per-prevenire-incidenti-stradali': 'Prevenirea și gestionarea accidentelor',
  'guida-in-relazione-alle-qualita-e-condizioni-fisiche-e-psichiche': 'Starea fizică la volan și primul ajutor',
  'responsabilita-civile-penale-amministrativa': 'Răspunderea și asigurarea',
  'limitazione-dei-consumi': 'Consumul de carburant și mediul',
  'elementi-costitutivi-del-veicolo-importanti-per-la-sicurezza': 'Părțile vehiculului și revizia',
};

const AR: TopicNames = {
  'segnali-di-indicazione': 'علامات الإرشاد',
  'segnali-di-obbligo': 'علامات الإلزام',
  'pannelli-integrativi-dei-segnali': 'اللوحات التكميلية',
  'segnali-complementari': 'العلامات التكميلية وعلامات الأشغال',
  'esempi-di-precedenza': 'الأولوية عند التقاطعات',
  'segnalazioni-semaforiche': 'الإشارات الضوئية وإشارات الشرطي',
  'segnaletica-orizzontale': 'علامات الطريق الأرضية',
  'segnali-di-pericolo': 'علامات التحذير',
  'segnali-di-precedenza': 'علامات الأولوية',
  'segnali-di-divieto': 'علامات المنع',
  'definizioni-stradali-e-di-traffico': 'تعريفات الطريق والمرور',
  'norme-sulla-circol-dei-veicoli': 'قواعد السير',
  'ingombro-della-carreggiata': 'إشغال الطريق والطرق السريعة',
  'uso-delle-luci': 'الأنوار والمنبّه والإشارات',
  'limiti-di-velocita': 'حدود السرعة والمزلقانات',
  'distanza-di-sicurezza': 'مسافة الأمان',
  'norme-sul-sorpasso': 'التجاوز',
  'fermata-sosta-arresto-e-partenza': 'التوقّف والوقوف والانطلاق',
  'dispositivi-di-equipaggiamento-funzione-ed-uso': 'الأحزمة ومقاعد الأطفال والخوذ',
  'patenti-di-guida': 'الرخص والوثائق والعقوبات',
  'comportamenti-per-prevenire-incidenti-stradali': 'تفادي الحوادث والتعامل معها',
  'guida-in-relazione-alle-qualita-e-condizioni-fisiche-e-psichiche': 'اللياقة للقيادة والإسعاف الأولي',
  'responsabilita-civile-penale-amministrativa': 'المسؤولية والتأمين',
  'limitazione-dei-consumi': 'استهلاك الوقود والبيئة',
  'elementi-costitutivi-del-veicolo-importanti-per-la-sicurezza': 'أجزاء المركبة والفحص الفني',
};

const UK: TopicNames = {
  'segnali-di-indicazione': 'Інформаційні знаки',
  'segnali-di-obbligo': 'Наказові знаки',
  'pannelli-integrativi-dei-segnali': 'Додаткові таблички',
  'segnali-complementari': 'Додаткові знаки та знаки робіт',
  'esempi-di-precedenza': 'Першочерговість на перехрестях',
  'segnalazioni-semaforiche': 'Світлофори та сигнали регулювальника',
  'segnaletica-orizzontale': 'Дорожня розмітка',
  'segnali-di-pericolo': 'Попереджувальні знаки',
  'segnali-di-precedenza': 'Знаки пріоритету',
  'segnali-di-divieto': 'Заборонні знаки',
  'definizioni-stradali-e-di-traffico': 'Визначення дороги й руху',
  'norme-sulla-circol-dei-veicoli': 'Правила руху',
  'ingombro-della-carreggiata': 'Зайняття проїзної частини та автомагістралі',
  'uso-delle-luci': 'Світло, звуковий сигнал і знаки',
  'limiti-di-velocita': 'Обмеження швидкості та переїзди',
  'distanza-di-sicurezza': 'Безпечна дистанція',
  'norme-sul-sorpasso': 'Обгін',
  'fermata-sosta-arresto-e-partenza': 'Зупинка, стоянка та початок руху',
  'dispositivi-di-equipaggiamento-funzione-ed-uso': 'Пояси, дитячі крісла та шоломи',
  'patenti-di-guida': 'Посвідчення, документи та покарання',
  'comportamenti-per-prevenire-incidenti-stradali': 'Запобігання ДТП і дії після неї',
  'guida-in-relazione-alle-qualita-e-condizioni-fisiche-e-psichiche': 'Стан водія та перша допомога',
  'responsabilita-civile-penale-amministrativa': 'Відповідальність і страхування',
  'limitazione-dei-consumi': 'Витрата пального та довкілля',
  'elementi-costitutivi-del-veicolo-importanti-per-la-sicurezza': 'Частини автомобіля й техогляд',
};

const ES: TopicNames = {
  'segnali-di-indicazione': 'Señales de indicación',
  'segnali-di-obbligo': 'Señales de obligación',
  'pannelli-integrativi-dei-segnali': 'Paneles complementarios',
  'segnali-complementari': 'Señales complementarias y de obras',
  'esempi-di-precedenza': 'La prioridad en los cruces',
  'segnalazioni-semaforiche': 'Semáforos y señales del agente',
  'segnaletica-orizzontale': 'Marcas viales',
  'segnali-di-pericolo': 'Señales de peligro',
  'segnali-di-precedenza': 'Señales de prioridad',
  'segnali-di-divieto': 'Señales de prohibición',
  'definizioni-stradali-e-di-traffico': 'Definiciones de la vía y del tráfico',
  'norme-sulla-circol-dei-veicoli': 'Normas de circulación',
  'ingombro-della-carreggiata': 'Ocupación de la calzada y autopistas',
  'uso-delle-luci': 'Luces, claxon y señales',
  'limiti-di-velocita': 'Límites de velocidad y paso a nivel',
  'distanza-di-sicurezza': 'Distancia de seguridad',
  'norme-sul-sorpasso': 'El adelantamiento',
  'fermata-sosta-arresto-e-partenza': 'Parada, estacionamiento y arranque',
  'dispositivi-di-equipaggiamento-funzione-ed-uso': 'Cinturones, sillitas y cascos',
  'patenti-di-guida': 'Permisos, documentos y sanciones',
  'comportamenti-per-prevenire-incidenti-stradali': 'Prevenir y afrontar un accidente',
  'guida-in-relazione-alle-qualita-e-condizioni-fisiche-e-psichiche': 'Aptitud para conducir y primeros auxilios',
  'responsabilita-civile-penale-amministrativa': 'Responsabilidad y seguro',
  'limitazione-dei-consumi': 'Consumo y medio ambiente',
  'elementi-costitutivi-del-veicolo-importanti-per-la-sicurezza': 'Partes del vehículo e inspección',
};

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

const TOPIC_NAMES: Record<string, TopicNames> = { ro: RO, ar: AR, uk: UK, es: ES, en: EN };

/** The section's name in `locale`, falling back to the listato's Italian. */
export function topicName(locale: string, id: string, italian: string): string {
  return TOPIC_NAMES[locale]?.[id] ?? italian;
}
