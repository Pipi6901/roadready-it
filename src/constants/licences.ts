import type { IconName } from '@/components/ui/Icon';

/**
 * Licence categories the Italian theory exam is sat for, in the order the
 * picker shows them. Codes are the ministry's, and the same ones the listato
 * tags each statement with — the two must match byte for byte, because
 * `questionAppliesTo` compares them as strings.
 *
 * Only the A and B family is here, because that is what the listato covers:
 * every one of its statements is tagged AM, A1, A2, A, B1, B, BE. The
 * categories above B (C, CE, D, DE) are examined from a separate listato that
 * this app does not carry — offering them on the picker would hand the learner
 * an app with no questions in it.
 *
 * Grouping is by vehicle, not by the letter: a learner going for a car licence
 * looks for "cars", not for the alphabet.
 *
 * B1 and BE stay in the list but off the picker. B1 (quadricycle) is rare
 * enough to bury the row nearly everyone wants, and BE is an extension taken
 * after B with no theory paper of its own — but both are tagged on the
 * statements, so they have to resolve.
 */
export type LicenceGroup = 'moto' | 'car';

export interface LicenceCategory {
  code: string;
  group: LicenceGroup;
  icon: IconName;
  /** Minimum age, for the picker's one-line description. */
  minAge: number;
  /** Not offered on the picker; still a valid saved value. */
  hidden?: boolean;
}

export const LICENCE_CATEGORIES: LicenceCategory[] = [
  { code: 'AM', group: 'moto', icon: 'bike', minAge: 14 },
  { code: 'A1', group: 'moto', icon: 'bike', minAge: 16 },
  { code: 'A2', group: 'moto', icon: 'bike', minAge: 18 },
  { code: 'A', group: 'moto', icon: 'bike', minAge: 24 },
  { code: 'B1', group: 'car', icon: 'car-front', minAge: 16, hidden: true },
  { code: 'B', group: 'car', icon: 'car-front', minAge: 18 },
  { code: 'BE', group: 'car', icon: 'car-front', minAge: 18, hidden: true },
];

export const LICENCE_GROUPS: LicenceGroup[] = ['car', 'moto'];

/** What the picker offers, in group order. A saved hidden code is shown too, so it can be seen and changed. */
export function pickableLicences(current: string): LicenceCategory[] {
  return LICENCE_CATEGORIES.filter((l) => !l.hidden || l.code === current);
}

export const DEFAULT_LICENCE = 'B';

export function findLicence(code: string): LicenceCategory {
  return LICENCE_CATEGORIES.find((l) => l.code === code) ?? LICENCE_CATEGORIES.find((l) => l.code === DEFAULT_LICENCE)!;
}
