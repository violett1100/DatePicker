import './App.css'
import './assets/css/DatePicker.min.css'
import { DatePicker } from './components/DatePicker'

function App() {
    return (
        <>
            <div className="container">
                <div>
                    <h4>
                        Date Range Component for <span style={{ color: 'purple' }}>current month</span>
                    </h4>
                    <DatePicker restrictMonth={true} />
                </div>
                <div>
                    <h4>
                        Date Range Component for <span style={{ color: 'purple' }}>cross months</span>
                    </h4>
                    <DatePicker />
                </div>
            </div>
        </>
    )
}

export default App
