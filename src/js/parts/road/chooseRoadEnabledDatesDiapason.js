// загружам актовные диапазоны дат для страницы  маршрута

import { monthNames } from "../plan-form/utils/monthNames.js";

export function chooseRoadEnabledDatesDiapason(day) {
    const month = day.closest('.month__grid-days');
    const allDays = [...month.querySelectorAll('span')];
    const index = allDays.indexOf(day)

    // сортировка диапазонов по числу дня
    const arr = Array.from(findDiapason(index, allDays))
        .sort((a, b) => {
            return +a.textContent - +b.textContent;
        });

    document.querySelectorAll('.diapason').forEach(elem => {
        elem.classList.remove('_choosed');
    });

    arr.forEach(elem => {
        if (elem.classList.contains('_choosed')) {
            elem.classList.remove('_choosed');
        }
        else {
            elem.classList.add('_choosed');
        }
    });

    // получаем тексты соотв. выбранных диапазонов

    const first = arr[0];
    const last = arr[arr.length - 1];

    const montStarthNum = first.closest('.month').dataset.monthnum;
    const yearStart = first.closest('.month').dataset.year;
    const montEndNum = last.closest('.month').dataset.monthnum;
    const yearEnd = last.closest('.month').dataset.year;

    const monthStartName = monthNames.en[+montStarthNum - 1]
    const monthEndName = monthNames.en[+montEndNum - 1]

    let outputText = '';
    let outputDate = '';


    // вывод соотв. дат после выбора
    const outputElem = document.querySelector('#road__calendar-month');

    if (arr.length == 1) {
        outputText = `${first.textContent}.${montStarthNum}.${yearStart}`;
        outputDate = `<span>${monthStartName} ${first.textContent}, ${yearStart}</span>`;
    }
    else {
        outputText = `${first.textContent}.${montStarthNum}.${yearStart} — ${last.textContent}.${montEndNum}.${yearEnd}`;
        outputDate = `<span>${monthStartName} ${first.textContent}, ${yearStart} — </span><span>${monthEndName} ${last.textContent}, ${yearEnd}</span>`;
    }
    outputElem.innerHTML = outputDate;
    outputElem.dataset.date = outputText;
}


// подбор диазаонов в массив из всего календаря маршута

function findDiapason(index, array) {
    let arr = [];
    for (let i = index; i < array.length; i++) {
        const element = array[i];
        if (element.classList.contains('diapason')) {
            arr.push(element);
        }
        else {
            break;
        }
    }

    for (let i = index; i >= 0; i--) {
        const element = array[i];
        if (element.classList.contains('diapason')) {
            arr.push(element);
        }
        else {
            break;
        }
    }

    return new Set(arr);
}
