/**
 * Cloudflare DNS service (STUB)
 * Implement later:
 * - create CNAME record for slug.baseDomain -> Vercel target
 */
import { KEYS } from "../config/keys.js";

export async function ensureSubdomain({ slug }) {
  if (!KEYS.cloudflare.apiToken || KEYS.cloudflare.apiToken.includes("CLOUDFLARE")) {
    console.warn("[Cloudflare] Set KEYS.cloudflare.* in apps/api/src/config/keys.js");
  }
  return { ok: true, fqdn: `${slug}.${KEYS.cloudflare.baseDomain}` };
}
