import {useState, useEffect} from 'react'
import './RightPanel.css'

function RightPanel(){
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000)

        return () => clearInterval(timer);
    }, [])

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    const hours = time.getHours()
    const minutes = time.getMinutes().toString().padStart(2, '0')
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const hours12 = hours % 12 || 12

    return (
        <div className="right-panel">
            <div className="right-panel-date">
                <p className="rp-dayname">{dayNames[time.getDay()]}</p>
                <div className="rp-datenum">{time.getDate()}</div>
                <p className="rp-monthyear">{monthNames[time.getMonth()]} {time.getFullYear()}</p>
            </div>

            <div className="rp-clock">
                <p className="rp-time">{hours12}:{minutes}</p>
                <p className="rp-ampm">{ampm} - LOCAL TIME </p>
            </div>

            <div className="rp-tasks">
                <p className="rp-tasks-label"> ✓ TASKS </p>
                <p className="rp-tasks-empty"> Nothing due today</p>
            </div>
        </div>
    )
}

export default RightPanel