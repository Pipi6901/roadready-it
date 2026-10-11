/**
 * Published legal documents.
 *
 * App Review requires a subscription app to link a reachable privacy policy
 * and terms from inside the app, not only from the store listing — the
 * Settings rows under "About" and the footnote on the purchase screens are
 * those links.
 *
 * One pair of documents per app. The Polish and British ones must not be
 * reused here: each names its own app, its own ministry and its own data
 * controller, and App Review reads them. Sources live in docs/legal/ and are
 * uploaded to pmoffice.space by hand — keep the file names, because these
 * exact URLs go into the App Store Connect listing as well as into Settings.
 *
 * NOT YET PUBLISHED: the Italian pages still have to be written and
 * uploaded. Until they are, both links 404 — which is a rejection on its own
 * (Guideline 5.1.1) and blocks external TestFlight too.
 */
export const PRIVACY_POLICY_URL = 'https://pmoffice.space/roadready-it-privacy.html';
export const TERMS_OF_USE_URL = 'https://pmoffice.space/roadready-it-terms.html';
