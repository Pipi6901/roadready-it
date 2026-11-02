import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AdaptyFlowView, type AdaptyFlow } from 'react-native-adapty';

import { ONBOARDING_FINISH_ACTION } from '@/constants/adapty';
import { EVENTS, track } from '@/features/analytics/analytics';
import { FLOW_LOAD_TIMEOUT_MS, FlowLoadError, isOfflineError, loadFlow } from '@/features/onboarding/loadFlow';
import { useSettings } from '@/store/SettingsProvider';
import { afterOnboarding } from '@/features/onboarding/afterOnboarding';
import { useTheme } from '@/theme/ThemeProvider';

/**
 * Presents the onboarding flow built in the Adapty dashboard (Flows &
 * Paywalls). This is the app's only onboarding entry point — see app/index.tsx.
 *
 * This screen only presents informational onboarding content. The actual
 * purchase still happens on the existing paywall.tsx (RevenueCatUI.Paywall) —
 * so the flow must contain no paywall step. Its last screen's button is
 * configured with the custom action ONBOARDING_FINISH_ACTION (a flow's close
 * button works as well), and both hand off to the paywall.
 *
 * It never shows an error. A funnel that cannot load is a shop window that
 * failed to light up, not something the learner needs to read about: the app
 * moves on to the paywall, or straight into the app when the device has no
 * connection, because the paywall would fail on the same network.
 */
export default function AdaptyOnboardingScreen() {
  const t = useTheme();
  const router = useRouter();
  const { licenceChosen, update, uiLocaleCode } = useSettings();
  const [flow, setFlow] = React.useState<AdaptyFlow | null>(null);
  // Every exit goes through here once: the flow can fire a close and an error
  // in the same breath, and two router.replace calls in a row make a mess.
  const left = React.useRef(false);

  const goToPaywall = React.useCallback(() => {
    if (left.current) return;
    left.current = true;
    router.replace('/paywall?source=onboarding');
  }, [router]);

  /**
   * Escape hatch for a first-ever launch with no network. Adapty cannot load,
   * the paywall cannot fetch its offerings either, and `onboarded` is only
   * ever set on the paywall — so without this the app is a dead end on the one
   * screen it can't get past, while the entire question bank sits ready inside
   * the binary. Onboarding is a shop window; it must never be what keeps
   * someone out of the app.
   */
  const skipToApp = React.useCallback(
    (reason: string) => {
      if (left.current) return;
      left.current = true;
      track(EVENTS.onboardingCompleted, { reason });
      update({ onboarded: true });
      router.replace(afterOnboarding(licenceChosen));
    },
    [update, router, licenceChosen],
  );

  // Pair of onboarding_completed: the gap between the two is the share who
  // dropped out inside the Adapty funnel, which is otherwise visible nowhere.
  React.useEffect(() => {
    track(EVENTS.onboardingStarted);
  }, []);

  React.useEffect(() => {
    let cancelled = false;

    loadFlow()
      .then((result) => {
        if (!cancelled) setFlow(result);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        const offline = e instanceof FlowLoadError ? e.offline : isOfflineError(e);
        const stage = e instanceof FlowLoadError ? e.stage : 'unknown';
        if (offline) {
          skipToApp('skipped_offline');
        } else {
          track(EVENTS.onboardingCompleted, { reason: 'flow_unavailable', stage });
          goToPaywall();
        }
      });

    return () => {
      cancelled = true;
    };
    // Once per mount: the exits are guarded by `left`, and re-running this on
    // a changed callback identity would fetch the flow again.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The flow is rendered in the language the learner chose for the app. In
  // SDK 4 the locale defaults to English rather than to the flow's own default,
  // so leaving it out would freeze the funnel in English the day Italian is
  // added in the dashboard. A language the flow does not have falls back to
  // the flow's default one.
  const params = React.useMemo(
    () => ({ locale: uiLocaleCode, loadTimeoutMs: FLOW_LOAD_TIMEOUT_MS }),
    [uiLocaleCode],
  );

  const finish = React.useCallback(
    (reason: string) => {
      track(EVENTS.onboardingCompleted, { reason });
      goToPaywall();
      return true;
    },
    [goToPaywall],
  );

  if (!flow) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: t.colors.bg }}>
        <ActivityIndicator color={t.colors.accent} />
      </View>
    );
  }

  return (
    <AdaptyFlowView
      flow={flow}
      params={params}
      style={{ flex: 1 }}
      onCloseButtonPress={() => finish('closed')}
      onCustomAction={(actionId) => (actionId === ONBOARDING_FINISH_ACTION ? finish('finished') : false)}
      onError={(e) => {
        if (isOfflineError(e)) {
          skipToApp('skipped_offline');
        } else {
          finish('error');
        }
        return true;
      }}
    />
  );
}
