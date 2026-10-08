/**
 * DEMO CONTENT BUNDLE — placeholder question bank.
 *
 * The questions live in src/data/pl-bank: 22 sections × 5, written from
 * scratch against the Prawo o ruchu drogowym in the exam's own format (TAK/NIE
 * for basic sections, A/B/C for specialist ones), each with a `sourceRef` to
 * the article it rests on. Nothing is copied from any examination authority.
 *
 * This bundle exists so the app can be built, demoed and QA'd before licensed
 * content is available. It is swapped wholesale through content.json — the
 * pipeline is described in docs/03-content-pipeline.md. Because the bundle is
 * plain data matching `ContentBundle`, no application code changes when the
 * swap happens.
 */

import type { ContentBundle, Country, Locale, Topic } from '@/types/content';
import { PL_BANK_TRANSLATIONS, PL_QUESTIONS } from './pl-bank';

/* -------------------------------------------------------------------------- */
/* Countries                                                                   */
/* -------------------------------------------------------------------------- */

const ITALY: Country = {
  code: 'IT',
  name: 'Italia',
  flagEmoji: '🇮🇹',
  // The exam is sat at the Motorizzazione Civile (UMC), which is also what a
  // candidate calls the place, so that is the name the app uses rather than
  // the ministry's.
  authority: 'Motorizzazione Civile',
  // TODO: rewrite once the ministerial listato is imported. Until then the
  // bundled seed is still the Polish demo bank, and the notice must not claim
  // an authority the content does not yet have.
  legalNotice:
    'Le domande di questa versione di prova sono scritte da RoadReady e non sono quesiti d\'esame di alcun ente. RoadReady non e affiliata al Ministero delle Infrastrutture e dei Trasporti ne alla Motorizzazione Civile.',
  status: 'active',
  // Patched below to QUESTIONS.length once that array exists.
  questionCount: 0,
  mockTest: {
    // DM 27 ottobre 2021, in force since 20 December 2021 for A1, A2, A, B1,
    // B and BE: thirty true/false statements, twenty minutes, three errors.
    questionCount: 30,
    timeLimitMinutes: 20,
    // Answers, not points: Italy weights nothing, so `maxPoints` is absent and
    // the bar is simply 30 minus the three errors the decree allows.
    passMark: 27,
    // No `timing`: the twenty minutes cover the whole scheda, there is no
    // per-question clock. No `composition` or `weights`: one class of
    // question, drawn at random from the 25 chapters of the listato.
    //
    // The candidate may move freely through the scheda and change an answer
    // until the paper is submitted, which is the opposite of Poland.
    allowReview: true,
  },
  currency: 'EUR',
};

export const COUNTRIES: Country[] = [ITALY];

/* -------------------------------------------------------------------------- */
/* Locales                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Translation languages, ordered by the size of the audience that reads them.
 *
 * The exam itself is sat in Polish, English, German or Polish sign language,
 * so for everyone outside those four the app's job is to teach in one language
 * and prepare them to answer in another. That gap is the product.
 *
 * Ukrainian first by a wide margin (1.55m residence permits, 77% of all
 * foreigners); Russian second as the shared reading language of the
 * post-Soviet groups — Belarusian, Georgian, Uzbek, Moldovan; then English
 * (Indian, Filipino and Nepali workers, and an exam language in its own
 * right), Spanish (Colombians, the fastest-growing group), and Turkish.
 *
 * The test for the tail of this list is not headcount but coverage: a language
 * earns a place if it reaches readers no other language here reaches. Belarusian
 * is the second-largest group in Poland and still does not qualify — that
 * audience reads Russian, which is already on the list, so a Belarusian
 * catalogue would double the translation bill for the same readers. Georgian and
 * Romanian fail the same test. Turkish passes it.
 *
 * Polish itself is not in this list: it is the original the translations sit
 * beside, offered as "no translation" rather than as a language choice.
 */
export const LOCALES: Locale[] = [
  {
    code: 'uk',
    nameNative: 'Українська',
    nameEnglish: 'Ukrainian',
    direction: 'ltr',
    flagEmoji: '🇺🇦',
  },
  {
    code: 'ru',
    nameNative: 'Русский',
    nameEnglish: 'Russian',
    direction: 'ltr',
    flagEmoji: '🇷🇺',
  },
  {
    code: 'en',
    nameNative: 'English',
    nameEnglish: 'English',
    direction: 'ltr',
    flagEmoji: '🇬🇧',
  },
  {
    code: 'es',
    nameNative: 'Español',
    nameEnglish: 'Spanish',
    direction: 'ltr',
    flagEmoji: '🇪🇸',
  },
  // German is an exam language, and the ministry's catalogue ships an official
  // German translation of every question — the one language that costs nothing
  // to offer. Fifth, not first: the German-reading audience in Poland is small.
  {
    code: 'de',
    nameNative: 'Deutsch',
    nameEnglish: 'German',
    direction: 'ltr',
    flagEmoji: '🇩🇪',
  },
  {
    code: 'tr',
    nameNative: 'Türkçe',
    nameEnglish: 'Turkish',
    direction: 'ltr',
    flagEmoji: '🇹🇷',
  },
];

/* -------------------------------------------------------------------------- */
/* Topics                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * The 22 sections of the Polish category-B bank: 16 basic and 6 specialist.
 *
 * The split by class is not decoration. A basic section is answered TAK/NIE
 * and carries general road-safety knowledge; a specialist one has three
 * lettered options and covers what is specific to the licence category. They
 * are scored into two separate halves of the paper, so a candidate weak in one
 * half is in a different kind of trouble than one weak in the other, and a flat
 * list of 22 hides exactly that.
 *
 * The section names themselves are a product decision. The regulation fixes the
 * classes, the weights and the counts, but it does not publish a thematic
 * taxonomy, and no competitor publishes theirs either. This one follows the
 * structure of the traffic code, which is what the questions are drawn from.
 */
const TOPICS: Topic[] = [
  {
    id: 'zasady-ogolne',
    name: 'Zasady ogólne i pojęcia',
    slug: 'zasady-ogolne',
    icon: 'book-open',
    category: 'basic',
    sortOrder: 1,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'znaki-ostrzegawcze',
    name: 'Znaki ostrzegawcze',
    slug: 'znaki-ostrzegawcze',
    icon: 'triangle-alert',
    category: 'basic',
    sortOrder: 2,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'znaki-zakazu',
    name: 'Znaki zakazu',
    slug: 'znaki-zakazu',
    icon: 'circle-slash',
    category: 'basic',
    sortOrder: 3,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'znaki-nakazu',
    name: 'Znaki nakazu',
    slug: 'znaki-nakazu',
    icon: 'circle-arrow-right',
    category: 'basic',
    sortOrder: 4,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'znaki-informacyjne',
    name: 'Znaki informacyjne i kierunku',
    slug: 'znaki-informacyjne',
    icon: 'info',
    category: 'basic',
    sortOrder: 5,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'znaki-poziome',
    name: 'Znaki poziome i tabliczki',
    slug: 'znaki-poziome',
    icon: 'route',
    category: 'basic',
    sortOrder: 6,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'sygnalizacja',
    name: 'Sygnalizacja i sygnały kierującego',
    slug: 'sygnalizacja',
    icon: 'circle-dot',
    category: 'basic',
    sortOrder: 7,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'pierwszenstwo',
    name: 'Pierwszeństwo i skrzyżowania',
    slug: 'pierwszenstwo',
    icon: 'git-fork',
    category: 'basic',
    sortOrder: 8,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'wlaczanie-zmiana',
    name: 'Włączanie się do ruchu i zmiana kierunku',
    slug: 'wlaczanie-zmiana',
    icon: 'corner-up-right',
    category: 'basic',
    sortOrder: 9,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'wyprzedzanie',
    name: 'Wyprzedzanie, omijanie, wymijanie',
    slug: 'wyprzedzanie',
    icon: 'arrow-left-right',
    category: 'basic',
    sortOrder: 10,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'predkosc',
    name: 'Prędkość i odstępy',
    slug: 'predkosc',
    icon: 'gauge',
    category: 'basic',
    sortOrder: 11,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'zatrzymanie-postoj',
    name: 'Zatrzymanie i postój',
    slug: 'zatrzymanie-postoj',
    icon: 'circle-parking',
    category: 'basic',
    sortOrder: 12,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'piesi-rowerzysci',
    name: 'Piesi, rowerzyści, przejazdy kolejowe',
    slug: 'piesi-rowerzysci',
    icon: 'bike',
    category: 'basic',
    sortOrder: 13,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'sytuacje-szczegolne',
    name: 'Sytuacje szczególne i trudne warunki',
    slug: 'sytuacje-szczegolne',
    icon: 'cloud-rain',
    category: 'basic',
    sortOrder: 14,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'sytuacje-drogowe',
    name: 'Sytuacje drogowe — filmy i zdjęcia',
    slug: 'sytuacje-drogowe',
    icon: 'video',
    category: 'basic',
    sortOrder: 15,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'pierwsza-pomoc',
    name: 'Pierwsza pomoc',
    slug: 'pierwsza-pomoc',
    icon: 'heart-pulse',
    category: 'basic',
    sortOrder: 16,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'ekologia',
    name: 'Ekologia i kultura jazdy',
    slug: 'ekologia',
    icon: 'leaf',
    category: 'basic',
    sortOrder: 17,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'technika-manewry',
    name: 'Technika kierowania i manewry',
    slug: 'technika-manewry',
    icon: 'car',
    category: 'specialist',
    sortOrder: 18,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'warunki-techniczne',
    name: 'Warunki techniczne pojazdu',
    slug: 'warunki-techniczne',
    icon: 'wrench',
    category: 'specialist',
    sortOrder: 19,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'wyposazenie',
    name: 'Wyposażenie i obciążenie pojazdu',
    slug: 'wyposazenie',
    icon: 'package',
    category: 'specialist',
    sortOrder: 20,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'dokumenty',
    name: 'Dokumenty i obowiązki kierującego',
    slug: 'dokumenty',
    icon: 'file-text',
    category: 'specialist',
    sortOrder: 21,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'przewoz',
    name: 'Przewóz osób, ładunku i holowanie',
    slug: 'przewoz',
    icon: 'truck',
    category: 'specialist',
    sortOrder: 22,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'autostrady',
    name: 'Autostrady i drogi ekspresowe',
    slug: 'autostrady',
    icon: 'milestone',
    category: 'specialist',
    sortOrder: 23,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
];

/* -------------------------------------------------------------------------- */
/* Questions                                                                   */
/* -------------------------------------------------------------------------- */

const QUESTIONS = PL_QUESTIONS;

// questionCount per topic, from the questions that actually reference it —
// a hand-maintained number drifts the moment the bank grows.
for (const topic of TOPICS) {
  topic.questionCount = QUESTIONS.filter((q) => q.topicId === topic.id).length;
}

ITALY.questionCount = QUESTIONS.length;

/* -------------------------------------------------------------------------- */
/* Bundle                                                                      */
/* -------------------------------------------------------------------------- */

export const DEMO_BUNDLE: ContentBundle = {
  country: ITALY,
  topics: TOPICS,
  questions: QUESTIONS,
  // One catalogue per translation language in LOCALES, keyed by question id.
  translations: PL_BANK_TRANSLATIONS,
  // The bundled seed ships without images/clips — every real question's
  // mediaId comes from the admin's media library via content.json.
  media: {},
  versionHash: 'demo-pl-2026-09-14',
};
