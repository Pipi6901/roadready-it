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

export const PLAN_PERIOD: Record<Plan, string> = {
  monthly: 'per month',
  yearly: 'per year',
};

/** "Pro Monthly · £4.99", "Free trial", "Free" — the Current plan row value. */
export function planLabel(state: SubscriptionState): string {
  switch (state.status) {
    case 'trial':
      return 'Free trial';
    case 'active':
      return state.plan
        ? `Pro ${state.plan === 'monthly' ? 'Monthly' : 'Yearly'} · ${PLAN_PRICE[state.plan]}`
        : 'Pro';
    case 'expired':
      return 'Free (expired)';
    default:
      return 'Free';
  }
}

export function formatDate(iso: string | null, locale = 'en-GB'): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
