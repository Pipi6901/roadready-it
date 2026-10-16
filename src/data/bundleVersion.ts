/**
 * Whether the bundle already on the device is the one currently published.
 *
 * The check is a fetch of a few dozen bytes — `version.json`, which the admin's
 * publish step writes beside `content.json` and which holds only the bundle's
 * hash. Without it the app had to download the whole bundle, several megabytes,
 * at every launch to find out whether it had changed, which for a learner who
 * opens the app daily is gigabytes of mobile data a year spent learning
 * "nothing new" — and for the project, Hosting egress billed per launch.
 *
 * Deliberately conservative: it answers `true` only when the file was fetched,
 * parsed, and its hash is exactly the one held. Everything else — a missing
 * file (a site published before version.json existed), a network error, a body
 * that is not what was expected — answers `false`, and the caller falls back to
 * downloading the bundle as it always did. A wrong `false` costs one download;
 * a wrong `true` would leave a learner on old content, so doubt goes the
 * expensive way.
 *
 * No imports, and `fetch` passed in, so that every one of those cases can be
 * exercised without a device.
 */
export async function bundleIsCurrent(
  url: string,
  heldHash: string,
  fetchImpl: typeof fetch = fetch,
): Promise<boolean> {
  try {
    // no-store: the whole point is to learn whether something newer exists, and
    // an HTTP cache answering from the previous launch would defeat it.
    const res = await fetchImpl(url, { cache: 'no-store' });
    if (!res.ok) return false;
    const body: unknown = await res.json();
    const hash = (body as { versionHash?: unknown } | null)?.versionHash;
    return typeof hash === 'string' && hash.length > 0 && hash === heldHash;
  } catch {
    return false;
  }
}
