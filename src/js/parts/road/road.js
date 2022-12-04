// main calendar and choosed iteneraries calendar
import { IteneraryCalendar } from '../plan-form/calendar.js';
// выбор доступного дизапазона дат конкретного маршрута
import { chooseRoadEnabledDatesDiapason } from './chooseRoadEnabledDatesDiapason.js';

import { getAvailebleCars } from './getAvailebleCars.js';

document.addEventListener('DOMContentLoaded', function (e) {

    const roadCalendarBody = document.querySelector('.road__calendar-calendar');
    if (roadCalendarBody) {
        const calendar = new IteneraryCalendar(roadCalendarBody, roadDates);
        calendar.setCalendar();
    }


    document.addEventListener('click', function (e) {
        let targetEl = e.target;
        // клик на дипазон дней на календаре маршрута
        if (targetEl.classList.contains('diapason') && targetEl.closest('.road__calendar')) {
            chooseRoadEnabledDatesDiapason(targetEl);
            getAvailebleCars(availebleCars);
        }
    })

});

const roadDates = {
    'dates': [
        {
            'year': 2022,
            'month': 12,

        },
        {
            'year': 2023,
            'month': 1,
        },
    ],
    'enabledDays': [
        ['2022.12.28'],
        ['2022.12.29'],
        ['2022.12.1'],
        ['2022.12.2'],
        ['2022.12.4'],
        ['2022.12.5'],
        ['2023.1.10'],
        ['2023.1.11'],
        ['2023.1.12'],
    ]
}

const availebleCars = ['BMW', 'Ferrari', 'ABARTH', 'BMW', 'Ferrari', 'ABARTH']
