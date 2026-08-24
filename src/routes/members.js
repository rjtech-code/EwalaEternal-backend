import { Router } from 'express';
import Member from '../models/Member.js';
import { nextSequence } from '../models/Counter.js';
import { CATEGORY_CODES, COUNTRY_CODES, BRANDS, ASSOC_VALUES } from '../config/constants.js';

const router = Router();

// GET /api/members — directory listing with optional filters
// query params: search, country (code), category (code), brand, assoc
router.get('/', async (req, res) => {
  try {
    const { search, country, category, brand, assoc } = req.query;
    const filter = {};
    if (country) filter.countryCode = country;
    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (assoc) filter.assoc = assoc;
    if (search) filter.$text = { $search: String(search) };

    // Public listing — never expose personal contact details here.
    const members = await Member.find(filter).select('-contact').sort({ joinedAt: -1 }).lean();
    res.json({ members });
  } catch (err) {
    console.error('[members:list]', err);
    res.status(500).json({ error: 'Could not load the members directory.' });
  }
});

// GET /api/members/stats — counts for the directory stat bar
router.get('/stats', async (req, res) => {
  try {
    const [total, countries, assocMembers] = await Promise.all([
      Member.countDocuments(),
      Member.distinct('country'),
      Member.countDocuments({ assoc: 'member' }),
    ]);
    res.json({ total, countries: countries.length, assocMembers });
  } catch (err) {
    console.error('[members:stats]', err);
    res.status(500).json({ error: 'Could not load directory stats.' });
  }
});

// POST /api/members — join the EG Network
router.post('/', async (req, res) => {
  try {
    const {
      name, company, country, countryCode, state = '', city, website = '',
      contact, category, products = [], brand, assoc, assocName = '',
    } = req.body || {};

    const missing = ['name', 'company', 'country', 'countryCode', 'city', 'contact', 'category', 'brand', 'assoc']
      .filter((field) => !req.body?.[field]);
    if (missing.length) {
      return res.status(400).json({ error: `Missing required field(s): ${missing.join(', ')}` });
    }
    if (!CATEGORY_CODES.includes(category)) {
      return res.status(400).json({ error: 'Invalid category.' });
    }
    if (!COUNTRY_CODES.includes(countryCode)) {
      return res.status(400).json({ error: 'Invalid country.' });
    }
    if (!BRANDS.includes(brand)) {
      return res.status(400).json({ error: 'Invalid brand selection.' });
    }
    if (!ASSOC_VALUES.includes(assoc)) {
      return res.status(400).json({ error: 'Invalid association status.' });
    }

    const seq = await nextSequence('member-id');
    const egId = `EG-${countryCode}-${category}-${String(seq).padStart(6, '0')}`;

    const member = await Member.create({
      egId, name, company, country, countryCode, state, city, website, contact,
      category, products: Array.isArray(products) ? products : [], brand, assoc, assocName,
    });

    res.status(201).json({ member });
  } catch (err) {
    console.error('[members:create]', err);
    res.status(500).json({ error: 'Could not complete your registration. Please try again.' });
  }
});

export default router;
