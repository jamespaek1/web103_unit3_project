import dotenv from 'dotenv'
dotenv.config({ path: new URL('../../server/.env', import.meta.url).pathname })

import { pool } from './database.js'

const createTables = async () => {
  const createLocationsTable = `
    DROP TABLE IF EXISTS events;
    DROP TABLE IF EXISTS locations;

    CREATE TABLE IF NOT EXISTS locations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      image VARCHAR(500)
    );
  `

  const createEventsTable = `
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      location_id INTEGER REFERENCES locations(id),
      title VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      time TIME NOT NULL,
      image VARCHAR(500),
      description TEXT
    );
  `

  const insertLocations = `
    INSERT INTO locations (id, name, description, image)
    VALUES
      (1, 'Echo Lounge', 'An intimate venue known for indie and alternative acts with a vibrant atmosphere and great acoustics.', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600'),
      (2, 'House of Blues', 'A legendary music hall hosting everything from rock to R&B with a soulful Southern vibe.', 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600'),
      (3, 'The Pavilion', 'An outdoor amphitheater perfect for summer concerts under the stars.', 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600'),
      (4, 'American Airlines Arena', 'A massive arena hosting the biggest names in music, sports, and entertainment.', 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600');
  `

  const insertEvents = `
    INSERT INTO events (location_id, title, date, time, image, description)
    VALUES
      (1, 'Indie Night Live', '2025-04-10', '20:00', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', 'A showcase of the best local indie bands.'),
      (1, 'Acoustic Sessions', '2025-04-18', '19:00', 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400', 'Stripped-down performances in an intimate setting.'),
      (1, 'DJ Spin Night', '2025-05-02', '22:00', 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=400', 'Electronic beats and deep house all night long.'),
      (2, 'Blues Legends Festival', '2025-04-15', '18:00', 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400', 'Three days of the greatest blues artists alive.'),
      (2, 'Rock Revival', '2025-05-01', '20:00', 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400', 'Classic rock tribute bands take the stage.'),
      (2, 'R&B Showcase', '2025-03-20', '19:30', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', 'Smooth R&B performances from rising stars.'),
      (3, 'Summer Beats Festival', '2025-06-15', '16:00', 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400', 'An all-day outdoor music festival.'),
      (3, 'Jazz Under the Stars', '2025-05-22', '19:00', 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400', 'An evening of smooth jazz in the open air.'),
      (3, 'Country Night', '2025-04-28', '18:30', 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400', 'Boot-scootin country music under the stars.'),
      (4, 'Pop Extravaganza', '2025-05-10', '19:00', 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400', 'The biggest pop acts on one stage.'),
      (4, 'Hip-Hop Takeover', '2025-04-22', '20:00', 'https://images.unsplash.com/photo-1547355253-ff0740f6e8c1?w=400', 'Top hip-hop artists battle it out.'),
      (4, 'Electronic Rave', '2025-03-05', '21:00', 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=400', 'A massive EDM experience with world-class DJs.');
  `

  try {
    await pool.query(createLocationsTable)
    await pool.query(createEventsTable)
    await pool.query(insertLocations)
    await pool.query(insertEvents)
    console.log('🎉 Database reset successfully!')
  } catch (err) {
    console.error('Error resetting database:', err)
  } finally {
    pool.end()
  }
}

createTables()