import { useState } from 'react'
import moment from 'moment'

export function useDatePicker() {
    const today = moment().format('YYYY-MM-DD') // 初始值預設當天
    const [currDate, setCurrDate] = useState(moment(today, 'YYYY-MM-DD'))
    const currDateStr = currDate.format('YYYY-MM-DD')
    const calendar = buildCalendar(currDateStr)
    const year = currDate.year() // calendar 當下年份
    const month = currDate.month() + 1 // calendar 當下月份

    interface selectedType {
        firstDate: string
        secondDate: string
    }
    const selectDates: selectedType = { firstDate: '', secondDate: '' }
    const [selected, setSelected] = useState(selectDates)

    // 切換月份
    function changeMonth(direction: 'prev' | 'next') {
        let newYear = year
        let newMonth = month + (direction === 'prev' ? -1 : 1)

        if (newMonth === 0) {
            newYear -= 1
            newMonth = 12
        } else if (newMonth === 13) {
            newYear += 1
            newMonth = 1
        }

        const findDate = `${newYear}-${String(newMonth).padStart(2, '0')}-01`
        setCurrDate(moment(findDate, 'YYYY-MM-DD'))
    }

    // 點選日期
    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        const clickedValue = event.currentTarget.dataset.value
        if (!clickedValue) return

        const { firstDate, secondDate } = selected
        // 如果 firstDate 還沒選擇，或 secondDate 已經有值，或 clickedValue < firstDate ，則重新選擇 firstDate
        if (!firstDate || secondDate || clickedValue < firstDate) {
            setSelected({ firstDate: clickedValue, secondDate: '' })
            return
        }
        // 如果 secondDate 還沒選，並且 clickedValue >= firstDate，則當成 secondDate
        if (!secondDate && clickedValue >= firstDate) {
            setSelected({ ...selected, secondDate: clickedValue })
        }
    }

    function buildCalendar(currday: string) {
        const currMoment = moment(currday, 'YYYY-MM-DD')
        const daysInMonth = currMoment.daysInMonth()

        const firstDay = currMoment.clone().startOf('month').day() // 取得當月第一天是星期幾
        const lastDay = currMoment.clone().endOf('month').day() // 取得當月最後一天是星期幾

        // 當月主要日期
        let days = Array.from({ length: daysInMonth }, (_, i) => {
            const date = currMoment.clone().date(i + 1)
            return date.format('YYYY-MM-DD')
        })

        // 補前一個月的日期
        if (firstDay !== 0) {
            const prevMonthMoment = currMoment.clone().subtract(1, 'month')
            const prevMonthDays = prevMonthMoment.daysInMonth()
            const prevMonthDates = Array.from({ length: firstDay }, (_, i) => {
                const date = prevMonthMoment.clone().date(prevMonthDays - firstDay + i + 1)
                return date.format('YYYY-MM-DD')
            })
            days = [...prevMonthDates, ...days]
        }

        // 補後一個月的日期
        if (lastDay !== 6) {
            const nextMonthMoment = currMoment.clone().add(1, 'month')
            const nextMonthDates = Array.from({ length: 6 - lastDay }, (_, i) => {
                const date = nextMonthMoment.clone().date(i + 1)
                return date.format('YYYY-MM-DD')
            })
            days = [...days, ...nextMonthDates]
        }
        return days
    }

    return { calendar, currDateStr, today, selected, changeMonth, handleClick }
}
