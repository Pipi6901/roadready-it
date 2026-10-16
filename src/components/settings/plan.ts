import type { Translate } from '@/features/i18n/translate';
import type { Plan, SubscriptionState } from '@/store/SubscriptionProvider';

/**
 * Display prices. The store is the source of truth at runtime — react-native-iap's
 * `fetchProducts` returns localised, tax-adjusted strings (ADR-012) — so these are
 * the fallback shown before the product list resolves, not the prices we charge.
 * TODO: replace with the localised price once real product IDs exist.
 */
export const PLAN_PRICE: Record<Plan, string> = {
  // Placeholder euro prices until the App Store Connect products exist. The
  // Italian quiz market is almost entirely free and ad-funded, so the bet here
  // is not on the questions — those are the ministry's and everyone has them —
  // but on the translation, and the figure has to stay low enough that a
  // learner tries it. The złoty figures that were here would have read as a
  // foreign app the moment anyone opened Settings.
  monthly: '6,99 €',
  yearly: '55,99 €',
};

/**
 * Everything below takes the translator rather than reading one.
 *
 * This is a plain module, not a component, so it cannot call useT() — and the
 * English constants that used to live here leaked into Settings in every
 * language. Passing `tr` in keeps the strings in the catalogue where the other
 * five languages can reach them.
 */

/** "per month" / "per year". */
export function planPeriod(plan: Plan, tr: Translate): string {
  return tr(plan === 'monthly' ? 'sub.perMonth' : 'sub.perYear');
}

/** "Monthly" / "Yearly". */
export function planName(plan: Plan, tr: Translate): string {
  return tr(plan === 'monthly' ? 'sub.planMonthly' : 'sub.planYearly');
}

/** "Pro Monthly · 6,99 €", "Free trial", "Free" — the Current plan row value. */
export function planLabel(state: SubscriptionState, tr: Translate): string {
  switch (state.status) {
    case 'trial':
      return tr('sub.statusTrial');
    case 'active':
      // Bare "Pro" is the product name, the same word in all six catalogues,
      // so it is the one string here that stays a literal.
      return state.plan
        ? tr('sub.statusActive', { plan: planName(state.plan, tr), price: PLAN_PRICE[state.plan] })
        : 'Pro';
    case 'expired':
      return tr('sub.statusExpired');
    default:
      return tr('sub.statusFree');
  }
}

/**
 * The locale is required rather than defaulted.
 *
 * It used to default to 'en-GB', which meant any caller that forgot it printed
 * British dates into a Ukrainian or Turkish screen and nothing complained.
 * Every caller has `useDateLocale()` to hand.
 */
export function formatDate(iso: string | null, locale: string): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
