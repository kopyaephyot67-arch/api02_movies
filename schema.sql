-- ─────────────────────────────────────────────────────────────
-- schema.sql — Database Table Definition
-- ─────────────────────────────────────────────────────────────
-- WHY THIS FILE EXISTS:
--   This creates the database and the movies table.
--   Run this ONCE in TiDB Cloud SQL Editor to set up the database.
--   Think of this as the "blueprint" of your data structure.
--
-- HOW TO RUN:
--   Step 1: Run only the CREATE DATABASE line first, click Run.
--   Step 2: Then run the rest (USE + CREATE TABLE), click Run.
--
-- FIELD EXPLANATIONS:
--   id           → auto-increments (1,2,3...) never set manually
--   title        → movie title, required (NOT NULL)
--   description  → movie description text
--   coverimage   → URL string pointing to the poster image
--   genre        → e.g. "Action", "Drama", "Comedy"
--   release_year → e.g. 2024
--   rating       → decimal 0.0–5.0, e.g. 4.5
--   created_at   → set automatically when row is inserted
-- ─────────────────────────────────────────────────────────────
-- ─────────────────────────────────────────────────────────────
-- schema.sql — Database Table Definition
-- ─────────────────────────────────────────────────────────────
-- WHY THIS FILE EXISTS:
--   This creates the database and the movies table.
--   Run this ONCE in TiDB Cloud SQL Editor to set up the database.
--   Think of this as the "blueprint" of your data structure.
--
-- HOW TO RUN:
--   Step 1: Run only the CREATE DATABASE line first, click Run.
--   Step 2: Then run the rest (USE + CREATE TABLE), click Run.
--
-- FIELD EXPLANATIONS:
--   id           → auto-increments (1,2,3...) never set manually
--   title        → movie title, required (NOT NULL)
--   description  → movie description text
--   coverimage   → URL string pointing to the poster image
--   genre        → e.g. "Action", "Drama", "Comedy"
--   year         → e.g. 2024
--   rating       → decimal 0.0–10.0, auto-increments +0.1 per tap
--   created_at   → set automatically when row is inserted
-- ─────────────────────────────────────────────────────────────

CREATE DATABASE IF NOT EXISTS movie_db;

USE movie_db;

CREATE TABLE IF NOT EXISTS movies (
  id          INT           NOT NULL AUTO_INCREMENT,
  title       VARCHAR(255)  NOT NULL,
  description TEXT,
  coverimage  VARCHAR(500),
  genre       VARCHAR(100),
  year        INT,
  rating      DECIMAL(4, 1) NOT NULL DEFAULT 0.0,
  created_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);