import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LocationsAPI from '../services/LocationsAPI'
import '../css/Locations.css'

const Locations = () => {
  const [locations, setLocations] = useState([])
  const navigate = useNavigate()

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
          src='https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900'
          alt='Unity Grid Plaza Map'
          style={{ width: '100%', borderRadius: '8px', border: '2px solid white' }}
        />
        <svg viewBox='0 0 900 600' style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <polygon
            points='0,0 450,0 450,300 0,300'
            onClick={() => navigate('/echolounge')}
          />
          <text x='130' y='160' fill='white' fontSize='22' fontWeight='bold' style={{ pointerEvents: 'none' }}>
            Echo Lounge
          </text>

          <polygon
            points='450,0 900,0 900,300 450,300'
            onClick={() => navigate('/houseofblues')}
          />
          <text x='570' y='160' fill='white' fontSize='22' fontWeight='bold' style={{ pointerEvents: 'none' }}>
            House of Blues
          </text>

          <polygon
            points='0,300 450,300 450,600 0,600'
            onClick={() => navigate('/pavilion')}
          />
          <text x='130' y='460' fill='white' fontSize='22' fontWeight='bold' style={{ pointerEvents: 'none' }}>
            The Pavilion
          </text>

          <polygon
            points='450,300 900,300 900,600 450,600'
            onClick={() => navigate('/americanairlines')}
          />
          <text x='540' y='460' fill='white' fontSize='22' fontWeight='bold' style={{ pointerEvents: 'none' }}>
            AA Arena
          </text>
        </svg>
      </div>
    </div>
  )
}

export default Locations