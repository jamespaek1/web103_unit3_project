import React, { useState, useEffect } from 'react'
import EventsAPI from '../services/EventsAPI'
import LocationsAPI from '../services/LocationsAPI'
import Event from '../components/Event'
import '../css/LocationEvents.css'

const Events = () => {
  const [events, setEvents] = useState([])
  const [locations, setLocations] = useState([])
  const [filterLocation, setFilterLocation] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsData = await EventsAPI.getAllEvents()
        setEvents(eventsData)

        const locationsData = await LocationsAPI.getAllLocations()
        setLocations(locationsData)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [])

  const filteredEvents = filterLocation
    ? events.filter((e) => e.location_id === parseInt(filterLocation))
    : events

  return (
    <div className='location-events'>
      <header>
        <div>
          <h2>All Events</h2>
        </div>
        <div>
          <p>Filter by location:</p>
          <select
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
          >
            <option value=''>All Locations</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>
      </header>

      <main>
        {filteredEvents && filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <Event key={event.id} data={event} />
          ))
        ) : (
          <h3>No events found.</h3>
        )}
      </main>
    </div>
  )
}

export default Events