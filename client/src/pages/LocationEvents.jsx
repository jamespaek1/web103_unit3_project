import React, { useState, useEffect } from 'react'
import LocationsAPI from '../services/LocationsAPI'
import EventsAPI from '../services/EventsAPI'
import Event from '../components/Event'
import '../css/LocationEvents.css'

const LocationEvents = ({ index }) => {
  const [location, setLocation] = useState({})
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationData = await LocationsAPI.getLocationById(index)
        setLocation(locationData)

        const eventsData = await EventsAPI.getEventsByLocation(index)
        setEvents(eventsData)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [index])

  return (
    <div className='location-events'>
      <header>
        <div className='location-image'>
          <img src={location.image} alt={location.name} />
        </div>
        <div>
          <h2>{location.name}</h2>
          <p>{location.description}</p>
        </div>
      </header>

      <main>
        {events && events.length > 0 ? (
          events.map((event) => (
            <Event key={event.id} data={event} />
          ))
        ) : (
          <h3>No events found for this location.</h3>
        )}
      </main>
    </div>
  )
}

export default LocationEvents