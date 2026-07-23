import { useState } from 'react'
import './MyWeek.css'

const BOOKS = [
{day: 'Mon', color: '#7B6FAB', darkColor: '#5B4F8B', flowerColor: '#C4B5FD' },
  { day: 'Tue', color: '#C4704A', darkColor: '#A0522D', flowerColor: '#FDBA74' },
  { day: 'Wed', color: '#4A9B7F', darkColor: '#2E7D5E', flowerColor: '#A7F3D0' },
  { day: 'Thu', color: '#C4829A', darkColor: '#A0607A', flowerColor: '#FBCFE8' },
  { day: 'Fri', color: '#6A9EC4', darkColor: '#4A7EA0', flowerColor: '#BFDBFE' },
  { day: 'Sat', color: '#C4A84A', darkColor: '#A08030', flowerColor: '#FDE68A' },
  { day: 'Sun', color: '#9B7BC4', darkColor: '#7B5BA0', flowerColor: '#DDD6FE' },
]

function MyWeek(){
    const [selectedDay, setSelectedDay] = useState(null)
    const [taskInput, setTaskInput] = useState('')
    const [weekTasks, setWeekTasks] = useState ({
       Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: [], Sun: [] 
    })

    const today = new Date().toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 3)

    const addTask = () => {
        if(!taskInput.trim() || !selectedDay) return
        const newTask = {id: Date.now(), text: taskInput, done: false}
       setWeekTasks(prev => ({
      ...prev,
      [selectedDay]: [...prev[selectedDay], newTask]
    }))
    setTaskInput('')
    }

    const toggleTask = (day, id) => {
        setWeekTasks(prev => ({
      ...prev,
      [day]: prev[day].map(t => t.id === id ? { ...t, done: !t.done } : t)
    }))
    }

    return (
        <div className = "myweek-view">
            <div className = "myweek-header">
                <h1> My Week </h1>
                <p> Click a book to open that day's tasks</p>
            </div>

            <div className="bookshelf">
                <div className="books-row">
                    {BOOKS.map(book => {
                        const isToday = book.day === today
                        const isSelected = book.day === selectedDay
                        const taskCount = weekTasks[book.day].length

                        return (
                            <div
                            key={book.day}
                            className={`book ${isSelected ? 'selected' : ''} ${isToday ? 'today-book' : ''}`}
                            style={{
                            background: book.color,
                            borderColor: isSelected ? '#fff' : 'transparent',
                            boxShadow: isSelected ? `0 0 0 2px ${book.color}` : 'none'
                                }}
                            onClick={() => setSelectedDay(isSelected ? null : book.day)}
                            >
                                <div className="book-flower" style={{ color: book.flowerColor }}>✿</div>
                                <div className="book-day"> {book.day} </div>
                              {taskCount > 0 && (
                            <div className="book-badge">{taskCount}</div>
                                )}  
                                </div>

                        )
                    })}
                </div>
                <div className="shelf-plant" />
            </div>

            {selectedDay && (
        <div className="day-panel">
          <div className="day-panel-header">
            <h2>{selectedDay}</h2>
            <button className="close-btn" onClick={() => setSelectedDay(null)}>×</button>
          </div>

          <div className="day-input-row">
            <input
              type="text"
              placeholder={`Add a task for ${selectedDay}...`}
              value={taskInput}
              onChange={e => setTaskInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addTask()}
              className="day-input"
            />
            <button onClick={addTask} className="day-add-btn">+ Add</button>
          </div>

          <div className="day-tasks">
            {weekTasks[selectedDay].length === 0 && (
              <p className="day-empty">Nothing planned yet — add something!</p>
            )}
            {weekTasks[selectedDay].map(task => (
              <div key={task.id} className={`day-task ${task.done ? 'done' : ''}`}>
                <button
                  className={`task-checkbox ${task.done ? 'checked' : ''}`}
                  onClick={() => toggleTask(selectedDay, task.id)}
                />
                <span>{task.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
        </div>
    )
}

export default MyWeek