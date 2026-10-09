/**
 * The seed bank as the bundle reads it.
 *
 * Translations are empty on purpose: the five launch languages are written
 * against the full listato and arrive through content.json, not in the binary.
 * An empty catalogue is the honest state — BilingualText falls back to the
 * Italian when a translation is missing, which is exactly what should happen.
 */
import type { TranslationBundle } from '@/types/content';

export { IT_QUESTIONS } from './questions';

export const IT_BANK_TRANSLATIONS: TranslationBundle = {};
