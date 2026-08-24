# Ewala Eternal — Backend API

Express + MongoDB (Mongoose) backend powering:
- **EG Network Members Directory** (`/api/members`) — join form submissions + directory listing
- **Contact Us** (`/api/contact`) — enquiry form submissions

## Setup

1. Create a free MongoDB Atlas cluster: https://www.mongodb.com/atlas
2. `cp .env.example .env` and fill in your `MONGODB_URI` (and `CORS_ORIGIN` if your frontend runs elsewhere).
3. Install dependencies:
   ```
   npm install
   ```
4. Run in development (auto-restarts on change):
   ```
   npm run dev
   ```
   Or in production:
   ```
   npm start
   ```

The API listens on `http://localhost:5000` by default.

## Endpoints

| Method | Path                | Description                                  |
|--------|---------------------|-----------------------------------------------|
| GET    | `/api/health`       | Health check                                  |
| GET    | `/api/members`      | List directory members (filters: `search`, `country`, `category`, `brand`, `assoc`) |
| GET    | `/api/members/stats`| Directory stats (total, countries, assoc members) |
| POST   | `/api/members`      | Join the EG Network (creates a member + EG ID) |
| POST   | `/api/contact`      | Submit a Contact Us enquiry                   |

## Deploying

This is a long-running Node server, so it needs a host that keeps a process alive —
e.g. [Render](https://render.com), [Railway](https://railway.app), or a VPS.
(Vercel, which hosts the `frontend/`, only runs serverless functions, not this server directly.)

Set `MONGODB_URI` and `CORS_ORIGIN` (your deployed frontend URL) as environment
variables on whichever host you pick, then point the frontend's `VITE_API_URL`
at this server's deployed URL.
