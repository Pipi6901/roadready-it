import { adapty, type AdaptyFlow } from 'react-native-adapty';

import { ADAPTY_PUBLIC_KEY, ONBOARDING_PLACEMENT_ID } from '@/constants/adapty';

/**
 * Fetching the onboarding flow built in the Adapty dashboard.
 *
 * Screens compose components and don't talk to SDKs themselves (CLAUDE.md), so
 * this module is the only place on the fetch side that knows Adapty exists.
 *
 * Adapty retired its separate onboarding builder on 1 October 2026: what used
 * to be an onboarding is now a flow, served from a flow placement and rendered
 * by SDK 4 only. `getOnboarding` still exists in SDK 4 but is deprecated and
 * does not return flows, which is why this file replaced loadOnboarding.ts.
 */

/** Which step failed — activation and placement lookup fail for different reasons. */
export type FlowLoadStage = 'activate' | 'fetch';

/**
 * How long the funnel gets before the app moves on without it.
 *
 * Onboarding is a shop window and must never be what keeps someone out of the
 * app: without a limit a slow network is a spinner with no way off it, and the
 * PL build shipped exactly that.
 */
export const FLOW_LOAD_TIMEOUT_MS = 8000;

/** AdaptyErrorCode.networkFailed */
const NETWORK_FAILED = 2005;

export class FlowLoadError extends Error {
  constructor(
    readonly stage: FlowLoadStage,
    readonly detail: string,
    /**
     * The failure says the device has no usable connection (or the funnel did not
     * arrive in time). The paywall needs the network too, so handing off to it
     * would only move the dead end one screen along.
     */
    readonly offline: boolean,
  ) {
    super(detail);
    this.name = 'FlowLoadError';
  }
}

/**
 * AdaptyError's `.message` is a generic wrapper ("An error was returned by the
 * server...") — the cause is in `.detail` (the actual HTTP request and response
 * body) and `.adaptyCode`.
 */
function describe(e: unknown): string {
  const err = e as { message?: string; detail?: string; adaptyCode?: unknown };
  const parts = [
    err?.message,
    err?.detail && `detail: ${err.detail}`,
    err?.adaptyCode != null && `code: ${err.adaptyCode}`,
  ].filter(Boolean);

  return parts.length ? parts.join('\n') : JSON.stringify(e);
}

export function isOfflineError(e: unknown): boolean {
  return (e as { adaptyCode?: unknown })?.adaptyCode === NETWORK_FAILED;
}

class TimedOut extends Error {}

function withTimeout<T>(work: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new TimedOut(`no answer in ${ms} ms`)), ms);
    work.then(
      (v) => {
        clearTimeout(timer);
        resolve(v);
      },
      (e) => {
        clearTimeout(timer);
        reject(e);
      },
    );
  });
}

export async function loadFlow(): Promise<AdaptyFlow> {
  try {
    // Unlike RevenueCat's Purchases.configure(), Adapty exposes isActivated()
    // specifically so callers can avoid a second activate() — which rejects
    // rather than no-oping.
    await withTimeout(
      (async () => {
        if (!(await adapty.isActivated())) {
          await adapty.activate(ADAPTY_PUBLIC_KEY);
        }
      })(),
      FLOW_LOAD_TIMEOUT_MS,
    );
  } catch (e) {
    // Kept separate from the fetch below: a failure here means the key or the
    // SDK setup, and retrying the placement lookup on top of it would report
    // the wrong cause.
    throw new FlowLoadError('activate', describe(e), e instanceof TimedOut || isOfflineError(e));
  }

  // No locale here: in SDK 4 it belongs to the view (see AdaptyFlowView's
  // params), not to the fetch.
  try {
    return await withTimeout(adapty.getFlow(ONBOARDING_PLACEMENT_ID), FLOW_LOAD_TIMEOUT_MS);
  } catch (targeted) {
    if (targeted instanceof TimedOut || isOfflineError(targeted)) {
      throw new FlowLoadError('fetch', describe(targeted), true);
    }
    // getFlow() resolves through the placement's audience rules;
    // getFlowForDefaultAudience() skips them. Trying both keeps a broken
    // audience rule from looking like a missing placement — and when both fail,
    // the two errors together say which it was.
    try {
      return await withTimeout(
        adapty.getFlowForDefaultAudience(ONBOARDING_PLACEMENT_ID),
        FLOW_LOAD_TIMEOUT_MS,
      );
    } catch (defaultAudience) {
      throw new FlowLoadError(
        'fetch',
        `placement: ${ONBOARDING_PLACEMENT_ID}\n\ngetFlow:\n${describe(targeted)}\n\ngetFlowForDefaultAudience:\n${describe(defaultAudience)}`,
        defaultAudience instanceof TimedOut || isOfflineError(defaultAudience),
      );
    }
  }
}
