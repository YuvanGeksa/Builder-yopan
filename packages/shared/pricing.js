export const PRICING_IDR = {
  "bio-links": 10000,
  "portfolio": 10000,
  "cv": 15000,
  "business-profile": 20000
};

export function getPrice(templateKey) {
  const v = PRICING_IDR[templateKey];
  if (!v) throw new Error(`Unknown template: ${templateKey}`);
  return v;
}
