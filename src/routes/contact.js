import { Router } from 'express';
import ContactEnquiry from '../models/ContactEnquiry.js';

const router = Router();

// POST /api/contact — the "Contact Us" form on the site
router.post('/', async (req, res) => {
  try {
    const { name, company = '', email, phone, category = '', message = '' } = req.body || {};
    const missing = ['name', 'email', 'phone'].filter((field) => !req.body?.[field]);
    if (missing.length) {
      return res.status(400).json({ error: `Missing required field(s): ${missing.join(', ')}` });
    }
    const enquiry = await ContactEnquiry.create({ name, company, email, phone, category, message });
    res.status(201).json({ enquiry });
  } catch (err) {
    console.error('[contact:create]', err);
    res.status(500).json({ error: 'Could not send your enquiry. Please try again.' });
  }
});

export default router;
