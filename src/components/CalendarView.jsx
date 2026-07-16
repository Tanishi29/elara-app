import { useState } from 'react'
import './CalendarView.css'

function CalendarView() {
    const [currentDate, setCurrentDate] = useState(new Date())

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const firstDay = new Date(year, month, 1).getDay()
const daysInMonth = new Date(year, month + 1, 0).getDate()

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1))
    }

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1))
    }

    const goToToday = () => {
        setCurrentDate(new Date())
    }

    const today = new Date()

    return (
        <div className="calendar-view">
      <div className="calendar-header">
        <div className="calendar-nav">
          <button onClick={goToToday} className="today-btn">Today</button>
          <button onClick={prevMonth} className="arrow-btn">‹</button>
          <button onClick={nextMonth} className="arrow-btn">›</button>
        </div>
        <h2 className="calendar-title">
          <span className="month-name">{monthNames[month]}</span>
          <span className="year">{year}</span>
        </h2>
      </div>

      <div className="calendar-grid">
        {dayNames.map(day => (
          <div key={day} className="day-header">{day}</div>
        ))}

        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="day-cell empty" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const dayNum = i + 1
          const isToday =
            dayNum === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()

          return (
            <div key={dayNum} className={`day-cell ${isToday ? 'today' : ''}`}>
              <span className="day-number">{dayNum}</span>
            </div>
          )
        })}
      </div>
    </div>
    )
}

export default CalendarView