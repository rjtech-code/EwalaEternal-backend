// Shared reference data for the EG Network Members Directory.
// Keep this in sync with frontend/src/data/site.ts (egNetwork section) —
// it is duplicated here so the API can validate submissions independently
// of whatever the client sends.

export const COUNTRIES = [
  ['India', 'IN'], ['Italy', 'IT'], ['China', 'CN'], ['Turkey', 'TR'], ['Brazil', 'BR'],
  ['Spain', 'ES'], ['Portugal', 'PT'], ['Vietnam', 'VN'], ['Egypt', 'EGY'], ['UAE', 'AE'],
  ['USA', 'US'], ['Greece', 'GR'], ['Iran', 'IR'], ['Indonesia', 'ID'], ['Other', 'OT'],
];

export const CATEGORIES = [
  ['Manufacturer', 'MFG'], ['Miner / Quarry', 'QRY'], ['Dealer / Distributor', 'DLR'],
  ['Exporter / Importer', 'EXP'], ['Architect / Designer', 'ARC'], ['Association', 'ASN'],
  ['Institution / Lab', 'INS'], ['Professional / Consultant', 'PRO'],
  ['Machinery / Technology', 'TEC'], ['Other', 'OTH'],
];

export const CATEGORY_CODES = CATEGORIES.map(([, code]) => code);
export const COUNTRY_CODES = COUNTRIES.map(([, code]) => code);

export const BRANDS = [
  'GajBala Group', 'Ewala Eternal Pvt. Ltd.', 'E-Ston Industry', 'E-Ston.ai',
  'Bhagyavan Solar', 'Independent / External Member',
];

export const ASSOC_VALUES = ['none', 'member'];

// Bump this whenever the Membership Policies, Terms & Conditions text changes —
// keep in sync with frontend/src/data/membership-terms.ts (TERMS_VERSION).
export const TERMS_VERSION = '2026-08-25';
