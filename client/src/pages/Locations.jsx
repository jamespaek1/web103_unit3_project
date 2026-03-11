import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LocationsAPI from '../services/LocationsAPI'
import '../css/Locations.css'

const locationPaths = {
  1: '/echolounge',
  2: '/houseofblues',
  3: '/pavilion',
  4: '/americanairlines'
}

const Locations = () => {
  const [locations, setLocations] = useState([])

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await LocationsAPI.getAllLocations()
        setLocations(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchLocations()
  }, [])

  return (
    <div className='available-locations'>
      <div style={{ position: 'relative', width: '100%', maxWidth: '900px' }}>
        <img
          src='https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900'
          alt='Unity Grid Plaza Map'
          style={{ width: '100%', borderRadius: '8px', border: '2px solid white' }}
        />
        <svg viewBox='0 0 900 600'>
          <Link to='/echolounge'>
            <polygon points='0,0 450,0 450,300 0,300' />
            <text x='130' y='160' fill='white' fontSize='22' fontWeight='bold' style={{ pointerEvents: 'none' }}>
              Echo Lounge
            </text>
          </Link>
          <Link to='/houseofblues'>
            <polygon points='450,0 900,0 900,300 450,300' />
            <text x='570' y='160' fill='white' fontSize='22' fontWeight='bold' style={{ pointerEvents: 'none' }}>
              House of Blues
            </text>
          </Link>
          <Link to='/pavilion'>
            <polygon points='0,300 450,300 450,600 0,600' />
            <text x='130' y='460' fill='white' fontSize='22' fontWeight='bold' style={{ pointerEvents: 'none' }}>
              The Pavilion
            </text>
          </Link>
          <Link to='/americanairlines'>
            <polygon points='450,300 900,300 900,600 450,600' />
            <text x='540' y='460' fill='white' fontSize='22' fontWeight='bold' style={{ pointerEvents: 'none' }}>
              AA Arena
            </text>
          </Link>
        </svg>
      </div>
    </div>
  )
}

export default Locations