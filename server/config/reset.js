import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env') })

// Dynamic import so env vars are loaded first
const { pool } = await import('./database.js')

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
      (1, 'Echo Lounge', 'An intimate venue known for indie and alternative acts with a vibrant atmosphere and great acoustics.', 'https://picsum.photos/seed/echolounge/600/400'),
      (2, 'House of Blues', 'A legendary music hall hosting everything from rock to R&B with a soulful Southern vibe.', 'https://picsum.photos/seed/houseblues/600/400'),
      (3, 'The Pavilion', 'An outdoor amphitheater perfect for summer concerts under the stars.', 'https://picsum.photos/seed/pavilion/600/400'),
      (4, 'American Airlines Arena', 'A massive arena hosting the biggest names in music, sports, and entertainment.', 'https://picsum.photos/seed/aarena/600/400');
  `

  const insertEvents = `
    INSERT INTO events (location_id, title, date, time, image, description)
    VALUES
      (1, 'Indie Night Live', '2025-04-10', '20:00', 'https://picsum.photos/seed/indie/400/400', 'A showcase of the best local indie bands.'),
      (1, 'Acoustic Sessions', '2025-04-18', '19:00', 'https://picsum.photos/seed/acoustic/400/400', 'Stripped-down performances in an intimate setting.'),
      (1, 'DJ Spin Night', '2025-05-02', '22:00', 'https://picsum.photos/seed/djspin/400/400', 'Electronic beats and deep house all night long.'),
      (2, 'Blues Legends Festival', '2025-04-15', '18:00', 'https://picsum.photos/seed/blues/400/400', 'Three days of the greatest blues artists alive.'),
      (2, 'Rock Revival', '2025-05-01', '20:00', 'https://picsum.photos/seed/rock/400/400', 'Classic rock tribute bands take the stage.'),
      (2, 'R&B Showcase', '2025-03-20', '19:30', 'https://picsum.photos/seed/rnb/400/400', 'Smooth R&B performances from rising stars.'),
      (3, 'Summer Beats Festival', '2025-06-15', '16:00', 'https://picsum.photos/seed/summer/400/400', 'An all-day outdoor music festival.'),
      (3, 'Jazz Under the Stars', '2025-05-22', '19:00', 'https://picsum.photos/seed/jazz/400/400', 'An evening of smooth jazz in the open air.'),
      (3, 'Country Night', '2025-04-28', '18:30', 'https://picsum.photos/seed/country/400/400', 'Boot-scootin country music under the stars.'),
      (4, 'Pop Extravaganza', '2025-05-10', '19:00', 'https://picsum.photos/seed/popmusic/400/400', 'The biggest pop acts on one stage.'),
      (4, 'Hip-Hop Takeover', '2025-04-22', '20:00', 'https://picsum.photos/seed/hiphop/400/400', 'Top hip-hop artists battle it out.'),
      (4, 'Electronic Rave', '2025-03-05', '21:00', 'https://picsum.photos/seed/rave/400/400', 'A massive EDM experience with world-class DJs.');
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