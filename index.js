// ─────────────────────────────────────────────────────────────
// index.js — App Entry Point
// ─────────────────────────────────────────────────────────────
// WHY THIS FILE EXISTS:
//   This is the "front door" of our API. It:
//   1. Creates the Express app
//   2. Attaches middleware (CORS, JSON parsing)
//   3. Registers all routes
//   4. Starts the server (only locally, not on Vercel)
//   5. Exports the app so Vercel can run it as a serverless function
//
// HOW VERCEL WORKS:
//   Vercel doesn't run a long-lived server. Instead it runs our
//   app as a "serverless function" — it wakes up per request.
//   That's why we export `app` and only call app.listen() when
//   NOT in production (NODE_ENV !== 'production').
// ─────────────────────────────────────────────────────────────

require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const moviesRouter = require('./routes/movies');

const app = express();

// ── Middleware ──────────────────────────────────────────────
// cors()        → allows ANY website/app to call our API
// express.json()→ parses incoming JSON request bodies
app.use(cors());
app.use(express.json());

// ── Routes ──────────────────────────────────────────────────
app.use('/movies', moviesRouter);

// ── Health check ────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'Movie API is running 🎬' });
});

// ── 404 fallback ────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ── Global error handler ────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// ── Start server (local dev only) ───────────────────────────
const PORT = process.env.PORT || 3333;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export for Vercel serverless deployment
module.exports = app;