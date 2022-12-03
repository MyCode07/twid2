import { monthNames } from "./utils/monthNames.js";

export class Calendar {

    constructor(elem, disabledDays, year, month) {
        // елемент вывода календаря
        this.elem = elem;
        // год
        this.year = year;
        // месяц    
        this.month = month;
        // неактивные даты в месяцах (не прошедшие а только неактивные) 
        this.disabledDays = disabledDays;
    }

    // создает и выводит календар
    createCalendar(year, month) {
        this.year = year;
        this.month = month;

        // текущая дата
        let currrentDate = new Date(this.year, this.month - 1, 1);

        // последняя дата заданного месяца
        let finalDate = new Date(this.year, this.month, 0);

        // находим ближайший понедельник
        while (currrentDate.getDay() != 1) {

            // листаем дату назад
            currrentDate.setDate(currrentDate.getDate() - 1);
        }
        
        // название текущего месяца
        const currentMonth = monthNames.en[this.month - 1];
        // элемент названия текущего месяца и текущий год
        const monthInfo = `<div class="month__title">${currentMonth}, ${this.year}</div>`;

        // названия дней недели
        const weekNames = {
            en: ['mon', 'tue', 'wen', 'thu', 'fri', 'sat', 'sun'],
            pt: []
        }

        // элемент недели
        const weeks = `
        <div class="month__grid-week">
            <span>${weekNames.en[0]}</span>
            <span>${weekNames.en[1]}</span>
            <span>${weekNames.en[2]}</span>
            <span>${weekNames.en[3]}</span>
            <span>${weekNames.en[4]}</span>
            <span>${weekNames.en[5]}</span>
            <span>${weekNames.en[6]}</span>        
        </div>`;

        // откываем сетку месяца
        let days = `<div class="month__grid-days">`;

        // добавлем дни месяца
        while (currrentDate <= finalDate) {

            let curr_day = '';
            let emptyClass = '';
            let presentClass = '';
            let actionClass = '';

            if (currrentDate.getMonth() == this.month - 1) {
                curr_day = currrentDate.getDate();

                if (month == new Date().getMonth() + 1 && currrentDate.getDate() < new Date().getDate()) {
                    presentClass = 'present';
                }

                else {
                    actionClass = 'enabled';
                    const date = `${this.year}.${month}.${curr_day}`;
                    for (let i = 0; i < this.disabledDays.disabledDays.length; i++) {
                        if (date == this.disabledDays.disabledDays[i]) {
                            actionClass = 'disabled';
                        }
                    }
                }
            }
            else {
                emptyClass = 'empty';
            }
            days += `<span class="${actionClass} ${emptyClass} ${presentClass}">${curr_day}</span>`;

            // листаем дату вперёд
            currrentDate.setDate(currrentDate.getDate() + 1);
        }

        // закрываем сетку месяца
        days += `</div>`;

        // собираем все части календаря воедино
        let table =
            `
            <div class="calendar__item month" data-month="${currentMonth}" data-monthnum="${this.month}" data-year="${this.year}">
                <div class="month__body">
                    ${monthInfo}
                    <div class="month__grid">
                        ${weeks}
                        ${days}
                    </div>
                </div>
            </div>
        `;

        // выводим в заданный элемент
        this.elem.insertAdjacentHTML('beforeend', table);
    }

    // создает календарь с текущего месяца на 1 год вперед + неактивные даты
    setCalendar() {
        const date = new Date();

        // текущий год
        let currentYear = date.getFullYear();

        // текущий месяц
        let currentMonth = date.getMonth();

        const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

        // перебираем массив месяцов 
        for (let i = 1; i <= months.length; i++) {

            // и если текщий месяц больше 12 к году добавляем +1 а месяц становится 1
            if (currentMonth == months.length) {
                currentYear++
                currentMonth = 1;
            }
            // в дугих случиях текущий увеличиваем месяц
            else {
                currentMonth++;
            }

            // вызываем создание календаря
            // параметры: заданный год, заданый месяц, неактивные даты 
            this.createCalendar(currentYear, currentMonth, this.disabledDays)
        }
    }
}

export class IteneraryCalendar {

    constructor(elem, enabledDays, year, month) {
        // елемент вывода календаря
        this.elem = elem;
        // год
        this.year = year;
        // месяц    
        this.month = month;
        // неактивные даты в месяцах (не прошедшие а только неактивные) 
        this.enabledDays = enabledDays;
    }

    // создает и выводит календар
    createCalendar(year, month) {
        this.year = year;
        this.month = month;

        // текущая дата
        let currrentDate = new Date(this.year, this.month - 1, 1);

        // последняя дата заданного месяца
        let finalDate = new Date(this.year, this.month, 0);

        // находим ближайший понедельник
        while (currrentDate.getDay() != 1) {

            // листаем дату назад
            currrentDate.setDate(currrentDate.getDate() - 1);
        }
        
        // название текущего месяца
        const currentMonth = monthNames.en[this.month - 1];
        // элемент названия текущего месяца и текущий год
        const monthInfo = `<div class="month__title">${currentMonth}, ${this.year}</div>`;

        // названия дней недели
        const weekNames = {
            en: ['mon', 'tue', 'wen', 'thu', 'fri', 'sat', 'sun'],
            pt: []
        }

        // элемент недели
        const weeks = `
        <div class="month__grid-week">
            <span>${weekNames.en[0]}</span>
            <span>${weekNames.en[1]}</span>
            <span>${weekNames.en[2]}</span>
            <span>${weekNames.en[3]}</span>
            <span>${weekNames.en[4]}</span>
            <span>${weekNames.en[5]}</span>
            <span>${weekNames.en[6]}</span>        
        </div>`;

        // откываем сетку месяца
        let days = `<div class="month__grid-days itenerary-days">`;

        // добавлем дни месяца
        while (currrentDate <= finalDate) {

            let curr_day = '';
            let emptyClass = '';
            let presentClass = '';
            let actionClass = '';

            if (currrentDate.getMonth() == this.month - 1) {
                curr_day = currrentDate.getDate();

                if (month == new Date().getMonth() + 1 && currrentDate.getDate() < new Date().getDate()) {
                    presentClass = 'present';
                }

                else {
                    const date = `${this.year}.${month}.${curr_day}`;
                    for (let i = 0; i < this.enabledDays.enabledDays.length; i++) {
                        if (date == this.enabledDays.enabledDays[i]) {
                            actionClass = 'diapason';
                        }
                    }
                }
            }
            else {
                emptyClass = 'empty';
            }
            days += `<span class="${actionClass} ${emptyClass} ${presentClass}">${curr_day}</span>`;

            // листаем дату вперёд
            currrentDate.setDate(currrentDate.getDate() + 1);
        }

        // закрываем сетку месяца
        days += `</div>`;

        // собираем все части календаря воедино
        let table =
            `
            <div class="calendar__item month" data-month="${currentMonth}" data-monthnum="${this.month}" data-year="${this.year}">
                <div class="month__body">
                    ${monthInfo}
                    <div class="month__grid">
                        ${weeks}
                        ${days}
                    </div>
                </div>
            </div>
        `;

        // выводим в заданный элемент
        this.elem.insertAdjacentHTML('beforeend', table);
    }

    // создает динамичный календарь по входным параметрам года и месяца + неактивные даты
    setCalendar() {

        // перебираем входные параметры и передаем в функцию создания календаря
        for (let i = 0; i < this.enabledDays.dates.length; i++) {
            const date = this.enabledDays.dates[i];

            // вызываем создание календаря
            // параметры: заданный год, заданый месяц, неактивные даты 
            this.createCalendar(date.year, date.month, this.enabledDays.enabledDays)
        }
    }

    // удаляет все месяца если они есть
    removeCalendar() {
        const months = this.elem.querySelectorAll('.month');
        if (months.length) {
            months.forEach(month => {
                month.remove();
            });
        }
    }

    // обновляет календар по новым заданным параметрам
    updateCalendar(enabledDays) {
        this.enabledDays = enabledDays;
        this.removeCalendar();
        this.setCalendar();
    }
}
