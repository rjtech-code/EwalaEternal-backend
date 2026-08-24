import { Router } from 'express';
import jwt from 'jsonwebtoken';
import Member from '../models/Member.js';
import ContactEnquiry from '../models/ContactEnquiry.js';
import { requireAdmin } from '../middleware/requireAdmin.js';

const router = Router();

// POST /api/admin/login — { password } -> { token }
router.post('/login', (req, res) => {
  const { password } = req.body || {};
  if (!process.env.ADMIN_PASSWORD) {
    return res.status(500).json({ error: 'ADMIN_PASSWORD is not configured on the server.' });
  }
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Incorrect password.' });
  }
  const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '12h' });
  res.json({ token });
});

// GET /api/admin/members — full member records, including contact details
router.get('/members', requireAdmin, async (req, res) => {
  try {
    const members = await Member.find().sort({ joinedAt: -1 }).lean();
    res.json({ members });
  } catch (err) {
    console.error('[admin:members]', err);
    res.status(500).json({ error: 'Could not load members.' });
  }
});

// GET /api/admin/contact — Contact Us enquiries
router.get('/contact', requireAdmin, async (req, res) => {
  try {
    const enquiries = await ContactEnquiry.find().sort({ submittedAt: -1 }).lean();
    res.json({ enquiries });
  } catch (err) {
    console.error('[admin:contact]', err);
    res.status(500).json({ error: 'Could not load contact enquiries.' });
  }
});

export default router;
