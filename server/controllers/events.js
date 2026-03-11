import { pool } from '../config/database.js'

const getAllEvents = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM events ORDER BY date ASC')
    res.status(200).json(results.rows)
  } catch (err) {
    res.status(409).json({ error: err.message })
  }
}

const getEventById = async (req, res) => {
  try {
    const id = req.params.id
    const results = await pool.query('SELECT * FROM events WHERE id = $1', [id])
    res.status(200).json(results.rows[0])
  } catch (err) {
    res.status(409).json({ error: err.message })
  }
}

const getEventsByLocation = async (req, res) => {
  try {
    const locationId = req.params.locationId
    const results = await pool.query(
      'SELECT * FROM events WHERE location_id = $1 ORDER BY date ASC',
      [locationId]
    )
    res.status(200).json(results.rows)
  } catch (err) {
    res.status(409).json({ error: err.message })
  }
}

export default { getAllEvents, getEventById, getEventsByLocation }