// main calendar and choosed iteneraries calendar
import { IteneraryCalendar } from './plan-form/calendar.js';

document.addEventListener('DOMContentLoaded', function (e) {

    const roadCalendarBody = document.querySelector('.road__calendar-calendar');
    if (roadCalendarBody) {
        const calendar = new IteneraryCalendar(roadCalendarBody, roadDates);
        calendar.setCalendar();
    }

});

const roadDates = {
    'dates': [
        {
            'year': 2022,
            'month': 11,

        },
        {
            'year': 2022,
            'month': 12,
        },
    ],
    'enabledDays': [
        ['2022.11.28'],
        ['2022.11.29'],
        ['2022.12.1'],
        ['2022.12.2'],
        ['2022.12.4'],
        ['2022.12.5'],
        ['2023.1.10'],
        ['2023.1.11'],
        ['2023.1.12'],
    ]
}