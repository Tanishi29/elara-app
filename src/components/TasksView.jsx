
import { useState, useEffect } from 'react';
import './TasksView.css';

function TasksView() {
    const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('elara-tasks')
    return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
    localStorage.setItem('elara-tasks', JSON.stringify(tasks))
    }, [tasks])

    const [input, setInput] = useState('');

    const addTask = () => {
        if(!input.trim()) return
        const newTask = {
            id: Date.now(),
            text: input,
            done: false,
            date: new Date().toLocaleDateString('en-US', {month: 'short', day: 'numeric'})
        }

        setTasks([...tasks, newTask]);
        setInput('')
    }

    const toggleTask = (id) => {
        setTasks(tasks.map(task => task.id === id ? {...task, done: !task.done} : task))
        }

        const activeTasks = tasks.filter(t => !t.done);
        const archivedTasks = tasks.filter(t => t.done);

        return (
            <div className="tasks-view">
                <div className="tasks-header">
                    <h1>Tasks</h1>
                    <p> Your list of things to do.</p>
                </div>

                <div className="tasks-input-row">
                    <input
                        type="text"
                        placeholder="Jot something down..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addTask()}
                        className="tasks-input"
                        />
                    <button onClick={addTask} className="tasks-add-btn">+</button>
                    </div>

                    <div className="tasks-list">
                        {activeTasks.map(task => (
                            <div key={task.id} className="task-item">
                                <button
                                className={`task-checkbox ${task.done ? 'checked' : ''}`}
                                onClick={() => toggleTask(task.id)}
                                />
                                <div className="task-info">
                                    <p className="task-text">{task.text}</p>
                                    <p className="task-date">📅 {task.date}</p>
                                    </div>
                                    </div>
                        ))}
                                </div>

                    {archivedTasks.length > 0 && (
        <div className="tasks-archived">
          <p className="archived-label">ARCHIVED</p>
          {archivedTasks.map(task => (
            <div key={task.id} className="task-item archived">
              <button
                className="task-checkbox checked"
                onClick={() => toggleTask(task.id)}
              />
              <div className="task-info">
                <p className="task-text">{task.text}</p>
                <p className="task-date">📅 {task.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}         
         </div>
        )

    }

    export default TasksView
