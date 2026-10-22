import { Platform } from 'react-native';

/**
 * Billing config (ADR-012 supersedes ADR-005's "Adapty" pick; ADR-014
 * supersedes ADR-012's react-native-iap choice with the native
 * react-native-purchases(-ui) SDK — see docs/00-decisions.md).
 *
 * Nothing here is secret: RevenueCat's public API keys and store product
 * identifiers are meant to ship inside the client, the same way a Stripe
 * publishable key does.
 */

/** From the RevenueCat dashboard → Project settings → API keys → Public app-specific key. */
export const REVENUECAT_API_KEY = Platform.select({
  // The Italian RevenueCat project, which is a different project from the
  // Polish one. Never paste Poland's key here: it is a valid key, so the SDK
  // configures cleanly and then offers products this bundle id does not own.
  ios: 'appl_tUcVOQYhvbUghhXRcrDUxiIcxpo',
  android: 'REPLACE_WITH_REVENUECAT_IT_ANDROID_PUBLIC_KEY',
  default: '',
})!;

/**
 * Whether a real key is in place. The placeholders above are deliberately not
 * valid keys, and RevenueCat's web SDK throws on one at configure() time —
 * which took the whole app down in the browser preview, before the first
 * screen. Until the Italian RevenueCat app exists the SDK is left
 * unconfigured and every learner is treated as free tier.
 */
export const BILLING_CONFIGURED =
  REVENUECAT_API_KEY.length > 0 && !REVENUECAT_API_KEY.startsWith('REPLACE_WITH_');

/** Must match the SKUs created in App Store Connect / Google Play Console exactly. */
export const PRODUCT_IDS = {
  monthly: 'com.astonio.roadreadyit.pro.monthly',
  yearly: 'com.astonio.roadreadyit.pro.yearly',
} as const;

/**
 * The entitlement identifier configured in the RevenueCat dashboard for "Pro"
 * access. One per project and they do not match: Poland uses
 * roadready_pl_pro, the British project "RoadReady Pro" with a space. A
 * wrong value here does not error — it just reports every paying learner as
 * unentitled.
 */
export const ENTITLEMENT_ID = 'roadready_it_pro';
