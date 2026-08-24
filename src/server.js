import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './db.js';
import membersRouter from './routes/members.js';
import contactRouter from './routes/contact.js';
import adminRouter from './routes/admin.js';

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = (process.env.CORS_ORIGIN || 'https://e-wala-eternal.vercel.app')
  .split(',')
  .map((origin) => origin.trim());

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use('/api/members', membersRouter);
app.use('/api/contact', contactRouter);
app.use('/api/admin', adminRouter);

app.use((req, res) => res.status(404).json({ error: 'Not found' }));
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('[unhandled]', err);
  res.status(500).json({ error: 'Something went wrong.' });
});

if (!process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET) {
  console.warn('[server] ADMIN_PASSWORD / JWT_SECRET not set — the /admin page will not be able to log in until these are set in .env');
}

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`[server] Ewala Eternal API listening on port ${PORT}`));
  })
  .catch((err) => {
    console.error('[server] failed to start:', err.message);
    process.exit(1);
  });
