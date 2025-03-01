import { useState } from 'react'
import moment from 'moment'
import clsx from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const currday = moment().format('YYYY-MM-DD')
// const currday = moment('2025-01-05', 'YYYY-MM-DD').format('YYYY-MM-DD')

export function CalendarHead({ dates }: { dates: { year: string; month: string } }) {
    return (
        <div className="header">
            <button>
                <ChevronLeft className="icon" />
            </button>
            <p>
                {dates.year} 年 {dates.month} 月
            </p>
            <button>
                <ChevronRight className="icon" />
            </button>
        </div>
    )
}

function buildCalendar(currday: string) {
    const year = moment(currday, 'YYYY-MM-DD').format('YYYY')
    const month = moment(currday, 'YYYY-MM-DD').format('MM')
    const date = moment(currday, 'YYYY-MM-DD').format('YYYY-MM-DD')
    const daysInMonth = moment(currday, 'YYYY-MM-DD').daysInMonth()
    const currMonth = moment(currday, 'YYYY-MM-DD').format('MM')

    const firstItemMonth = moment(currday, 'YYYY-MM-DD').date(1).day(0).format('MM')
    const firstItemDate = moment(currday, 'YYYY-MM-DD').date(1).day(0).day(0).format('DD')
    const lastItemMonth = moment(currday, 'YYYY-MM-DD').date(daysInMonth).day(6).format('MM')
    const lastItemDate = moment(currday, 'YYYY-MM-DD').date(daysInMonth).day(6).format('DD')

    let days = Array(daysInMonth)
        .fill(null)
        .map((e, i) => ({ day: (i + 1).toString(), state: 'default', seleted: false }))

    if (firstItemMonth !== currMonth) {
        const prevMonthDaysNum =
            moment(moment(currday, 'YYYY-MM-DD').subtract(1, 'months'), 'MM').daysInMonth() - Number(firstItemDate) + 1
        const prevMonthDays = Array(prevMonthDaysNum)
            .fill(null)
            .map((e, i) => ({ day: (Number(firstItemDate) + i).toString(), state: 'notCurrent', seleted: false }))
        days = prevMonthDays.concat(days)
    }
    if (lastItemMonth !== currMonth) {
        const nextMonthDaysNum = Number(lastItemDate)
        const nextMonthDays = Array(nextMonthDaysNum)
            .fill(null)
            .map((e, i) => ({ day: (i + 1).toString(), state: 'notCurrent', seleted: false }))
        days = days.concat(nextMonthDays)
    }
    const build = { days, year, month, date }
    return build
}

export function CrossMonthCalendar() {
    const [calendar, setCalendar] = useState(buildCalendar(currday))

    function prevMonth() {
        // get month: 0-11
        const currYear = moment(calendar.date, 'YYYY-MM-DD').get('year')
        const currMonth = moment(calendar.date, 'YYYY-MM-DD').get('month')
        if (currMonth == 0) {
            const findDate = (Number(currYear) - 1).toString() + '-12-01'
            setCalendar(buildCalendar(findDate))
            console.log(findDate)
        } else {
            const findDate = currYear + '-' + currMonth.toString() + '-01'
            console.log(findDate)
            setCalendar(buildCalendar(findDate))
        }
    }
    function nextMonth() {
        // get month: 0-11
        const currYear = moment(calendar.date, 'YYYY-MM-DD').get('year')
        const currMonth = moment(calendar.date, 'YYYY-MM-DD').get('month')
        if (currMonth == 11) {
            const findDate = (Number(currYear) + 1).toString() + '-01-01'
            setCalendar(buildCalendar(findDate))
            console.log(findDate)
        } else {
            const findDate = currYear + '-' + (Number(currMonth) + 2).toString() + '-01'
            console.log(findDate)
            setCalendar(buildCalendar(findDate))
        }
    }
    return (
        <div id="crossMonth" className="calendar">
            <div className="header">
                <button onClick={prevMonth}>
                    <ChevronLeft className="icon" />
                </button>
                <p>
                    {calendar.year} 年 {calendar.month} 月
                </p>
                <button onClick={nextMonth}>
                    <ChevronRight className="icon" />
                </button>
            </div>
            <hr />
            <div className="dates">
                {calendar.days.map((c, i) => (
                    <button key={i} className="default">
                        {c.day}
                    </button>
                ))}
            </div>
        </div>
    )
}

export function CurrentMonthCalendar() {
    const [calendar, setCalendar] = useState(buildCalendar(currday))

    return (
        <div id="currentMonth" className="calendar">
            <CalendarHead dates={{ year: calendar.year, month: calendar.month }} />
            <hr />
            <div className="dates">
                {calendar.days.map((c, i) => (
                    <button key={i} className={clsx('default', { disabled: c.state == 'notCurrent' })}>
                        {c.day}
                    </button>
                ))}
            </div>
        </div>
    )
}
