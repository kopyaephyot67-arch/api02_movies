-- ─────────────────────────────────────────────────────────────
-- seed.sql — Sample Data
-- ─────────────────────────────────────────────────────────────
-- WHY THIS FILE EXISTS:
--   "Seeding" means filling the database with initial test data
--   so the app isn't empty when you first run it.
--   Run this AFTER schema.sql in TiDB Cloud SQL Editor.
-- ─────────────────────────────────────────────────────────────

USE movie_db;

INSERT INTO movies (title, description, coverimage, genre, year, rating) VALUES
(
  'Inception',
  'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
  'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
  'Sci-Fi',
  2010,
  4.8
),
(
  'The Dark Knight',
  'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
  'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
  'Action',
  2008,
  4.9
),
(
  'Interstellar',
  'A team of explorers travel through a wormhole in space in an attempt to ensure humanity survival.',
  'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
  'Sci-Fi',
  2014,
  4.7
),
(
  'The Shawshank Redemption',
  'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
  'https://image.tmdb.org/t/p/w500/lyQBXzOQSuE59IsHyhrp0qIiPAz.jpg',
  'Drama',
  1994,
  4.9
),
(
  'Avengers: Endgame',
  'After the devastating events of Infinity War, the Avengers assemble once more in order to reverse Thanos actions and restore balance to the universe.',
  'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
  'Action',
  2019,
  4.6
),
(
  'Parasite',
  'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
  'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
  'Thriller',
  2019,
  4.8
);