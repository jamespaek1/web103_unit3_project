import express from 'express'
import EventsController from '../controllers/events.js'

const router = express.Router()

router.get('/events', EventsController.getAllEvents)
router.get('/events/:id', EventsController.getEventById)
router.get('/events/location/:locationId', EventsController.getEventsByLocation)

export default router