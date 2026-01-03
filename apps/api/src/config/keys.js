/**
 * ONE FILE FOR ALL KEYS (beginner-friendly)
 * NOTE: This file must stay SERVER-ONLY.
 */
export const KEYS = {
  mongodb: {
    uri: "mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/yopandelreyz"
  },

  // Only token required for your chosen Model A (1 project, multi-tenant)
  vercel: {
    token: "VERCEL_TOKEN_HERE"
  },

  cloudflare: {
    apiToken: "CLOUDFLARE_API_TOKEN_HERE",
    zoneId: "CLOUDFLARE_ZONE_ID_HERE",
    baseDomain: "yourdomain.com"
  },

  pakasir: {
    apiKey: "PAKASIR_API_KEY_HERE",
    projectSlug: "PAKASIR_PROJECT_SLUG_HERE",
    // your web URL to return after payment (optional for paylink flows)
    redirectUrl: "http://localhost:3000/status"
  }
};
