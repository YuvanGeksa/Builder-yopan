/**
 * Vercel deploy service (STUB)
 * You picked Model A: 1 project, multi-tenant.
 *
 * Implement later:
 * - generate files from content
 * - POST /v13/deployments
 * - add domain to project
 */
import { KEYS } from "../config/keys.js";

export async function deployToVercel({ siteSlug }) {
  if (!KEYS.vercel.token || KEYS.vercel.token.includes("VERCEL_TOKEN_HERE")) {
    console.warn("[Vercel] Set KEYS.vercel.token in apps/api/src/config/keys.js");
  }
  // TODO: implement
  return { url: `https://${siteSlug}.example-vercel.app`, status: "stub" };
}
