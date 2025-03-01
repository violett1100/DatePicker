import './App.css'
import './assets/css/calendar.min.css'
import { CurrentMonthCalendar, CrossMonthCalendar } from './_componments/calendar'

function App() {
    return (
        <>
            <div className="container">
                <div>
                    <h4>
                        Date Range Component for <span style={{ color: 'purple' }}>current month</span>
                    </h4>
                    <CurrentMonthCalendar />
                </div>
                <div>
                    <h4>
                        Date Range Component for <span style={{ color: 'purple' }}>cross months</span>
                    </h4>
                    <CrossMonthCalendar />
                </div>
            </div>
        </>
    )
}

export default App
