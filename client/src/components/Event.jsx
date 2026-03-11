import React, { useState, useEffect } from 'react'
import '../css/Event.css'

const Event = ({ data }) => {
  const [remaining, setRemaining] = useState('')
  const [isPast, setIsPast] = useState(false)

  const formatTime = (timeStr) => {
    if (!timeStr) return ''
    const [hours, minutes] = timeStr.split(':')
    const h = parseInt(hours)
    const ampm = h >= 12 ? 'PM' : 'AM'
    const hour12 = h % 12 || 12
    return `${hour12}:${minutes} ${ampm}`
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return ''
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    })
  }

  useEffect(() => {
    const calcRemaining = () => {
      if (!data.date || !data.time) return
      const dateOnly = typeof data.date === 'string' && data.date.includes('T')
        ? data.date.split('T')[0]
        : data.date
      const eventDate = new Date(`${dateOnly}T${data.time}`)
      const now = new Date()
      const diff = eventDate - now

      if (diff <= 0) {
        setIsPast(true)
        setRemaining('This event has passed')
      } else {
        setIsPast(false)
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
        const mins = Math.floor((diff / (1000 * 60)) % 60)
        setRemaining(`${days}d ${hours}h ${mins}m remaining`)
      }
    }

    calcRemaining()
    const interval = setInterval(calcRemaining, 60000)
    return () => clearInterval(interval)
  }, [data])

  return (
    <article className='event-information'>
      <img src={data.image} alt={data.title} />
      <div className='event-information-overlay'>
        <div className='text'>
          <h3>{data.title}</h3>
          <p>
            <i className='fa-regular fa-calendar fa-bounce'></i>
            {formatDate(data.date)}
            <br />
            {formatTime(data.time)}
          </p>
          <p className={isPast ? 'negative-time-remaining' : ''}>
            {remaining}
          </p>
        </div>
      </div>
    </article>
  )
}

export default Event