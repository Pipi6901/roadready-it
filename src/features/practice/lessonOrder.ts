import type { Question } from '@/types/content';

/**
 * The picture a statement is about, or null when it is text only.
 *
 * `mediaId` is what the published bundle carries; `sourceMedia` is the file the
 * importer found it under, and is all a bundled question has.
 */
export function figureOf(q: Pick<Question, 'mediaId' | 'sourceMedia'>): string | null {
  return q.mediaId ?? q.sourceMedia ?? null;
}

/**
 * How far ahead the next card may be taken from, and how many cards back a
 * picture must have been used before it may come round again.
 *
 * The listato heads a quesito with one figure and hangs about ten statements
 * under it, so in the ministry's order a lesson of ten is very often the same
 * sign ten times: 3,400 of the 6,995 neighbouring pairs inside the topics share
 * their picture, and 111 of the 715 ten-card lessons are eight or more cards
 * about one picture. A learner reads that as the app repeating itself. The
 * window has to be wide enough to reach the next quesito (ten cards each) past
 * the rest of this one, hence 80 rather than 10.
 */
const LOOKAHEAD = 80;
const COOLDOWN = 5;

/**
 * The same cards, re-sequenced so that a picture does not come back within the
 * next few cards.
 *
 * It is a stable greedy pass, not a shuffle: each step takes the earliest card
 * in the lookahead whose picture has not been seen in the last COOLDOWN cards,
 * so the topic keeps the ministry's overall order and the result is the same
 * every time — lesson 4 of a topic must stay lesson 4, because progress is
 * stored as "lessons completed", not as the ids that were in them. Text-only
 * statements are never held back. When every card in reach shares a recent
 * picture (the tail of a topic that has run out of variety) the earliest one
 * goes next, so nothing is ever dropped or duplicated.
 */
export function spreadFigures<T extends Pick<Question, 'mediaId' | 'sourceMedia'>>(cards: T[]): T[] {
  const waiting = [...cards];
  const out: T[] = [];
  const recent: (string | null)[] = [];

  while (waiting.length > 0) {
    const reach = Math.min(LOOKAHEAD, waiting.length);
    let pick = 0;
    for (let i = 0; i < reach; i++) {
      const figure = figureOf(waiting[i]);
      if (figure === null || !recent.includes(figure)) {
        pick = i;
        break;
      }
    }
    const [card] = waiting.splice(pick, 1);
    out.push(card);
    recent.push(figureOf(card));
    if (recent.length > COOLDOWN) recent.shift();
  }
  return out;
}

/**
 * `count` cards drawn at random, at most one per picture while there are
 * pictures to spare.
 *
 * A plain random draw from 7,020 statements that hang in groups of ten off 407
 * pictures lands on the same sign twice in a ten-card quiz often enough to be
 * noticed; taking the first card of each picture and only then topping up from
 * the rest makes the quiz as varied as the bank allows without ever returning
 * fewer cards than asked for.
 */
export function drawVaried<T extends Pick<Question, 'mediaId' | 'sourceMedia'>>(
  source: T[],
  count: number,
  random: () => number = Math.random,
): T[] {
  const copy = [...source];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  const picked: T[] = [];
  const held: T[] = [];
  const used = new Set<string>();
  for (const card of copy) {
    if (picked.length >= count) break;
    const figure = figureOf(card);
    if (figure !== null && used.has(figure)) {
      held.push(card);
      continue;
    }
    if (figure !== null) used.add(figure);
    picked.push(card);
  }
  for (const card of held) {
    if (picked.length >= count) break;
    picked.push(card);
  }
  return picked;
}
