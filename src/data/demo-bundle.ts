/**
 * SEED CONTENT BUNDLE — the bank the app ships with.
 *
 * The questions live in src/data/it-bank and are generated, not written: they
 * are real statements from the ministerial listato, kept only where they stand
 * without a figure, because the seed ships no media. Every one carries the
 * quesito and domanda number it came from in `sourceRef`.
 *
 * This bundle exists so the app can be built, demoed and QA'd before licensed
 * content is available. It is swapped wholesale through content.json — the
 * pipeline is described in docs/03-content-pipeline.md. Because the bundle is
 * plain data matching `ContentBundle`, no application code changes when the
 * swap happens.
 */

import type { ContentBundle, Country, Locale, Topic } from '@/types/content';
import { IT_BANK_TRANSLATIONS, IT_QUESTIONS } from './it-bank';

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
 * The 25 argomenti of the ministerial listato.
 *
 * Unlike Poland these are not ours: the ministry heads every quesito with one
 * of them, so the taxonomy comes with the content and cannot drift from it.
 * The names here are the first clause of each official argomento — the full
 * ones run past a hundred characters with semicolons in them, and a node on
 * the topic map has room for three lines.
 *
 * No `category`: Italy asks one class of question, thirty true/false
 * statements drawn from all 25 chapters, so there is no basic/specialist
 * split to carry.
 *
 * Generated from content/listato/content.json by scripts/make_seed.py's
 * sibling step — see scripts/import_listato.py for where the list comes from.
 */
const TOPICS: Topic[] = [
  {
    id: 'segnali-di-indicazione',
    name: 'Segnali di indicazione',
    slug: 'segnali-di-indicazione',
    icon: 'info',
    sortOrder: 1,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'segnali-di-obbligo',
    name: 'Segnali di obbligo',
    slug: 'segnali-di-obbligo',
    icon: 'circle-arrow-right',
    sortOrder: 2,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'pannelli-integrativi-dei-segnali',
    name: 'Pannelli integrativi dei segnali',
    slug: 'pannelli-integrativi-dei-segnali',
    icon: 'tag',
    sortOrder: 3,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'segnali-complementari',
    name: 'Segnali complementari',
    slug: 'segnali-complementari',
    icon: 'book-open',
    sortOrder: 4,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'esempi-di-precedenza',
    name: 'Esempi di precedenza',
    slug: 'esempi-di-precedenza',
    icon: 'git-fork',
    sortOrder: 5,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'segnalazioni-semaforiche',
    name: 'Segnalazioni semaforiche',
    slug: 'segnalazioni-semaforiche',
    icon: 'book-open',
    sortOrder: 6,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'segnaletica-orizzontale',
    name: 'Segnaletica orizzontale',
    slug: 'segnaletica-orizzontale',
    icon: 'book-open',
    sortOrder: 7,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'segnali-di-pericolo',
    name: 'Segnali di pericolo',
    slug: 'segnali-di-pericolo',
    icon: 'triangle-alert',
    sortOrder: 8,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'segnali-di-precedenza',
    name: 'Segnali di precedenza',
    slug: 'segnali-di-precedenza',
    icon: 'git-fork',
    sortOrder: 9,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'segnali-di-divieto',
    name: 'Segnali di divieto',
    slug: 'segnali-di-divieto',
    icon: 'circle-slash',
    sortOrder: 10,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'definizioni-stradali-e-di-traffico',
    name: 'Definizioni stradali e di traffico',
    slug: 'definizioni-stradali-e-di-traffico',
    icon: 'book-open',
    sortOrder: 11,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'norme-sulla-circol-dei-veicoli',
    name: 'Norme sulla circol. dei veicoli',
    slug: 'norme-sulla-circol-dei-veicoli',
    icon: 'car',
    sortOrder: 12,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'ingombro-della-carreggiata',
    name: 'Ingombro della carreggiata',
    slug: 'ingombro-della-carreggiata',
    icon: 'truck',
    sortOrder: 13,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'uso-delle-luci',
    name: 'Uso delle luci',
    slug: 'uso-delle-luci',
    icon: 'book-open',
    sortOrder: 14,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'limiti-di-velocita',
    name: 'Limiti di velocità',
    slug: 'limiti-di-velocita',
    icon: 'gauge',
    sortOrder: 15,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'distanza-di-sicurezza',
    name: 'Distanza di sicurezza',
    slug: 'distanza-di-sicurezza',
    icon: 'ruler',
    sortOrder: 16,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'norme-sul-sorpasso',
    name: 'Norme sul sorpasso',
    slug: 'norme-sul-sorpasso',
    icon: 'arrow-left-right',
    sortOrder: 17,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'fermata-sosta-arresto-e-partenza',
    name: 'Fermata, sosta, arresto e partenza',
    slug: 'fermata-sosta-arresto-e-partenza',
    icon: 'circle-parking',
    sortOrder: 18,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'dispositivi-di-equipaggiamento-funzione-ed-uso',
    name: 'Dispositivi di equipaggiamento: funzione ed uso',
    slug: 'dispositivi-di-equipaggiamento-funzione-ed-uso',
    icon: 'book-open',
    sortOrder: 19,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'patenti-di-guida',
    name: 'Patenti di guida',
    slug: 'patenti-di-guida',
    icon: 'book-open',
    sortOrder: 20,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'comportamenti-per-prevenire-incidenti-stradali',
    name: 'Comportamenti per prevenire incidenti stradali',
    slug: 'comportamenti-per-prevenire-incidenti-stradali',
    icon: 'shield-alert',
    sortOrder: 21,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'guida-in-relazione-alle-qualita-e-condizioni-fisiche-e-psichiche',
    name: 'Guida in relazione alle qualità e condizioni fisiche e psichiche',
    slug: 'guida-in-relazione-alle-qualita-e-condizioni-fisiche-e-psichiche',
    icon: 'heart-pulse',
    sortOrder: 22,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'responsabilita-civile-penale-amministrativa',
    name: 'Responsabilità civile, penale, amministrativa',
    slug: 'responsabilita-civile-penale-amministrativa',
    icon: 'scale',
    sortOrder: 23,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'limitazione-dei-consumi',
    name: 'Limitazione dei consumi',
    slug: 'limitazione-dei-consumi',
    icon: 'book-open',
    sortOrder: 24,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
  {
    id: 'elementi-costitutivi-del-veicolo-importanti-per-la-sicurezza',
    name: 'Elementi costitutivi del veicolo importanti per la sicurezza',
    slug: 'elementi-costitutivi-del-veicolo-importanti-per-la-sicurezza',
    icon: 'wrench',
    sortOrder: 25,
    // Patched below from the questions that actually reference it.
    questionCount: 0,
  },
];

/* -------------------------------------------------------------------------- */
/* Questions                                                                   */
/* -------------------------------------------------------------------------- */

const QUESTIONS = IT_QUESTIONS;

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
  translations: IT_BANK_TRANSLATIONS,
  // The bundled seed ships without images/clips — every real question's
  // mediaId comes from the admin's media library via content.json.
  media: {},
  versionHash: 'seed-it-listato',
};
