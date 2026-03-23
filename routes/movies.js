// ─────────────────────────────────────────────────────────────
// routes/movies.js — All Movie Endpoints
// ─────────────────────────────────────────────────────────────
// WHY THIS FILE EXISTS:
//   We separate routes into their own files to keep code clean.
//   index.js just "plugs in" this router with app.use('/movies').
//   Every function here is async/await so errors don't crash
//   the server — we catch them and return a proper 500 response.
//
// PARAMETERIZED QUERIES (? placeholders):
//   We NEVER put user input directly into SQL strings.
//   BAD:  `SELECT * FROM movies WHERE id = ${req.params.id}`
//   GOOD: `SELECT * FROM movies WHERE id = ?`, [req.params.id]
//   This prevents SQL injection attacks.
// ─────────────────────────────────────────────────────────────

const express = require('express');
const router  = express.Router();
const pool    = require('../db');

// ── 1. GET /movies ───────────────────────────────────────────
// Returns ALL movies sorted by newest first.
// Flutter list page calls this on startup.
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM movies ORDER BY created_at DESC'
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

// ── 2. GET /movies/:id ───────────────────────────────────────
// Returns ONE movie by its ID.
// Flutter detail page calls this when user taps a movie.
// Returns 404 if the movie doesn't exist.
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM movies WHERE id = ?',
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch movie' });
  }
});

// ── 3. POST /movies ──────────────────────────────────────────
// Creates a NEW movie from the request body.
// Returns the created movie with its new ID (status 201).
// 201 = "Created" (more specific than 200 "OK")
router.post('/', async (req, res) => {
  const { title, description, coverimage, genre, release_year, rating } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO movies (title, description, coverimage, genre, release_year, rating)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [title, description, coverimage, genre, release_year, rating ?? 0]
    );
    const [rows] = await pool.query(
      'SELECT * FROM movies WHERE id = ?',
      [result.insertId]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create movie' });
  }
});

// ── 4. PUT /movies/:id ───────────────────────────────────────
// Updates ALL fields of an existing movie.
// Checks if movie exists first — returns 404 if not found.
// PUT = replace everything (different from PATCH = update one field)
router.put('/:id', async (req, res) => {
  const { title, description, coverimage, genre, release_year, rating } = req.body;
  try {
    const [check] = await pool.query(
      'SELECT id FROM movies WHERE id = ?',
      [req.params.id]
    );
    if (check.length === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    await pool.query(
      `UPDATE movies
       SET title = ?, description = ?, coverimage = ?,
           genre = ?, release_year = ?, rating = ?
       WHERE id = ?`,
      [title, description, coverimage, genre, release_year, rating, req.params.id]
    );
    const [rows] = await pool.query(
      'SELECT * FROM movies WHERE id = ?',
      [req.params.id]
    );
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update movie' });
  }
});

// ── 5. PATCH /movies/:id/rating ──────────────────────────────
// Auto-increments rating by +0.1 per call, capped at 10.0
// No request body needed — Flutter just calls PATCH and rating goes up
// PATCH = partial update (only one field), not the whole record.
router.patch('/:id/rating', async (req, res) => {
  try {
    const [check] = await pool.query(
      'SELECT id FROM movies WHERE id = ?',
      [req.params.id]
    );
    if (check.length === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    await pool.query(
      'UPDATE movies SET rating = LEAST(rating + 0.1, 10.0) WHERE id = ?',
      [req.params.id]
    );
    const [rows] = await pool.query(
      'SELECT * FROM movies WHERE id = ?',
      [req.params.id]
    );
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update rating' });
  }
});

// ── 6. DELETE /movies/:id ────────────────────────────────────
// Deletes a movie by ID.
// Returns 404 if movie doesn't exist.
router.delete('/:id', async (req, res) => {
  try {
    const [check] = await pool.query(
      'SELECT id FROM movies WHERE id = ?',
      [req.params.id]
    );
    if (check.length === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    await pool.query('DELETE FROM movies WHERE id = ?', [req.params.id]);
    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete movie' });
  }
});

module.exports = router;