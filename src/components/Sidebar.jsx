
import './Sidebar.css'

function Sidebar({ activePage, setActivePage }) {
    return(
        <aside className="sidebar">
        <div className="sidebar-logo">
        <h1> Elara</h1>
        <p> Every Hour, thoughtfully yours.</p>
        </div>

        <nav className="sidebar-nav">
            <button
            className={`nav-btn ${activePage === 'calendar' ? 'active' : ''}`}
            onClick={() => setActivePage('calendar')}
            >
            Calendar
            </button>

            <button
            className={`nav-btn ${activePage === 'tasks' ? 'active' : ''}`}
            onClick={() => setActivePage('tasks')}
            >
            Tasks
            </button>

            <button
            className={`nav-btn ${activePage === 'myweek' ? 'active' : ''}`}
            onClick={() => setActivePage('myweek')}
            >
            My Week
            </button>

        </nav>
    </aside>
    )
}

export default Sidebar