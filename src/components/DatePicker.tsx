import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useDatePicker } from '../hooks/useDatePicker.ts'

interface DatePickerHeadProps {
    dates: { year: string; month: string }
    changeMonth?: (direction: 'prev' | 'next') => void
}

export function DatePickerHead(props: DatePickerHeadProps) {
    const { dates, changeMonth } = props
    return (
        <div className="header">
            <button onClick={() => changeMonth?.('prev')}>
                <ChevronLeft className="icon" />
            </button>
            <p>
                {dates.year} 年 {dates.month} 月
            </p>
            <button onClick={() => changeMonth?.('next')}>
                <ChevronRight className="icon" />
            </button>
        </div>
    )
}

interface DatePickerProps {
    restrictMonth?: boolean
}

export function DatePicker(prpos: DatePickerProps) {
    const { restrictMonth } = prpos
    const { calendar, currDateStr, today, selected, changeMonth, handleClick } = useDatePicker()
    const [currYear, currMonth] = currDateStr.split('-')
    return (
        <div className={`datePicker ${restrictMonth ? 'currentMonth' : 'crossMonth'}`}>
            <p className="selectedText">
                Selected Dates: {selected.firstDate} - {selected.secondDate}
            </p>
            <DatePickerHead
                dates={{ year: currYear, month: currMonth }}
                changeMonth={restrictMonth ? undefined : changeMonth}
            />

            <div className="dates">
                {calendar.map((date, i) => {
                    const [, month, day] = date.split('-')
                    const highlighted =
                        (selected.firstDate && !selected.secondDate && date === selected.firstDate) ||
                        (selected.firstDate &&
                            selected.secondDate &&
                            date >= selected.firstDate &&
                            date <= selected.secondDate)
                    return (
                        <button
                            key={i}
                            data-value={restrictMonth && month !== currMonth ? undefined : date}
                            onClick={handleClick}
                            className={`default ${date === today ? 'today' : ''} ${highlighted ? 'active' : ''} ${
                                restrictMonth && month !== currMonth ? 'disabled' : ''
                            }`}
                        >
                            {Number(day)}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
