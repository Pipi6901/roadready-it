/**
 * Interface languages.
 *
 * Distinct from the translation languages in `LOCALES` (src/data/demo-bundle.ts),
 * which decide what appears *under* a question. This list decides what the app
 * itself says — buttons, settings, results — and the two are chosen separately
 * on purpose: someone sitting the exam in Italian may still want the app in
 * Romanian, and someone comfortable in Italian may want no translation at all.
 *
 * Italian is here for the same reason it is not in LOCALES: content.json has
 * no Italian translation catalogue because Italian is the original the
 * questions are written in — but it is a perfectly ordinary choice for the
 * interface, and ITALIAN_LOCALE below puts it back into the question and
 * translation pickers, where it is a choice like any other.
 */
import { LOCALES } from '@/data/demo-bundle';
import type { Locale } from '@/types/content';

export interface UiLocale {
  code: string;
  nameNative: string;
  nameEnglish: string;
  flagEmoji: string;
}

export const UI_LOCALES: UiLocale[] = [
  { code: 'it', nameNative: 'Italiano', nameEnglish: 'Italian', flagEmoji: '🇮🇹' },
  { code: 'ro', nameNative: 'Română', nameEnglish: 'Romanian', flagEmoji: '🇷🇴' },
  { code: 'ar', nameNative: 'العربية', nameEnglish: 'Arabic', flagEmoji: '🇲🇦' },
  { code: 'uk', nameNative: 'Українська', nameEnglish: 'Ukrainian', flagEmoji: '🇺🇦' },
  { code: 'es', nameNative: 'Español', nameEnglish: 'Spanish', flagEmoji: '🇪🇸' },
  { code: 'en', nameNative: 'English', nameEnglish: 'English', flagEmoji: '🇬🇧' },
];

/**
 * The language the app falls back to.
 *
 * English rather than Italian, even though this is an Italian-market app: the
 * audience is largely people who do not read Italian yet — that gap is the whole
 * product — so defaulting the interface to Italian would greet exactly the wrong
 * user with a wall of the language they came here not knowing.
 */
export const FALLBACK_UI_LOCALE = 'en';

export function findUiLocale(code: string | null | undefined): UiLocale | null {
  if (!code) return null;
  return UI_LOCALES.find((l) => l.code === code) ?? null;
}

/**
 * The device's language, if the app speaks it.
 *
 * Read through Intl rather than expo-localization: Hermes ships a resolved
 * locale already, and this is the only thing the app needs from it — not worth
 * a native module in the build.
 */
export function deviceUiLocale(): string {
  try {
    const tag = Intl.DateTimeFormat().resolvedOptions().locale;
    const base = tag.split(/[-_]/)[0].toLowerCase();
    return findUiLocale(base) ? base : FALLBACK_UI_LOCALE;
  } catch {
    return FALLBACK_UI_LOCALE;
  }
}

/**
 * BCP-47 tag for `toLocaleDateString` and friends, from an interface language.
 *
 * Dates used to be formatted with a hardcoded British locale, so a Ukrainian
 * interface still said "14 Sept 2026" between two lines of Ukrainian. The
 * region halves are the conventional ones; only the language half changes what
 * a date looks like.
 */
export function dateLocaleFor(uiLocaleCode: string): string {
  return bcp47For(uiLocaleCode);
}

const BCP47: Record<string, string> = {
  it: 'it-IT', ro: 'ro-RO', ar: 'ar-EG', uk: 'uk-UA', es: 'es-ES', en: 'en-GB',
  // German and French are exam languages in the autonomous provinces.
  de: 'de-DE', fr: 'fr-FR',
};

/** Full BCP-47 tag for a bare language code — dates, and the speech engine. */
export function bcp47For(code: string): string {
  return BCP47[code] ?? 'en-GB';
}

/**
 * The languages the Italian theory exam is actually sat in.
 *
 * Italian everywhere, plus German in the province of Bolzano and French in
 * Valle d'Aosta, which are the only two places the ministry prints the scheda
 * in anything else. The quiz used to be translated into the seven official UN
 * languages as well; circolare 101771 of 21/12/2010 ended that, limiting the
 * translations to the linguistic regimes Italian law protects. That withdrawal
 * is the whole reason this app exists: a candidate who does not read technical
 * Italian has no official way around it any more.
 *
 * For those three the question is shown ALONE, because it is the wording the
 * candidate will meet at the Motorizzazione. Every other language in LOCALES is
 * a study aid and sits underneath the Italian.
 *
 * Not in content.json on purpose: remoteContent replaces the locale list
 * wholesale on every publish, and which languages a state exam accepts is a
 * fact about the exam, not about a content bundle.
 */
export const EXAM_LANGUAGES = ['it', 'de', 'fr'] as const;

export function isExamLanguage(code: string | null | undefined): boolean {
  return !!code && (EXAM_LANGUAGES as readonly string[]).includes(code);
}

/**
 * Italian as an entry in the language lists.
 *
 * It is absent from LOCALES because content.json carries a translation
 * catalogue per locale and Italian is the original, not a translation — but
 * both pickers need it as a choice: as the language the exam is sat in, and
 * as the line underneath when the exam is sat in German or French.
 */
/**
 * The language the catalogue itself is written in. Everything else in LOCALES
 * is a translation of it, and the code asks this constant rather than carrying
 * the literal around — forking the app to another country is then one edit.
 */
export const ORIGINAL_LOCALE = 'it';

export const ITALIAN_LOCALE: Locale = {
  code: ORIGINAL_LOCALE,
  nameNative: 'Italiano',
  nameEnglish: 'Italian',
  direction: 'ltr',
  flagEmoji: '🇮🇹',
};

/** Every language a question can be shown in, Italian included. */
export function allLocales(): Locale[] {
  return [ITALIAN_LOCALE, ...LOCALES];
}

export function findLocale(code: string | null | undefined): Locale | null {
  if (!code) return null;
  return allLocales().find((l) => l.code === code) ?? null;
}

/**
 * The languages the exam can be sat in, in the order the pickers show them:
 * Italian first because it is the original and the default, then whichever of
 * the others the content bundle actually carries.
 */
export function examLocales(): Locale[] {
  return allLocales().filter((l) => isExamLanguage(l.code));
}

/**
 * The languages that can only ever be a study aid.
 *
 * The exam cannot be sat in any of them, which is the whole reason the second
 * line exists — and the reason nothing from examLocales() belongs here. Two
 * exam languages on one card would be printing the question twice for a
 * candidate who can already read either.
 */
export function studyLocales(): Locale[] {
  return LOCALES.filter((l) => !isExamLanguage(l.code));
}
