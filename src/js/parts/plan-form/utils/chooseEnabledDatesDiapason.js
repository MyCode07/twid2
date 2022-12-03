import { addToCartButtonStatus } from "../plan-form.js";
import { monthNames } from "./monthNames.js";

export function chooseEnabledDatesDiapason(day) {
    const month = day.closest('.month__grid-days');
    const allDays = [...month.querySelectorAll('span')];
    const index = allDays.indexOf(day)


    const arr = Array.from(findDiapason(index, allDays))
        .sort((a, b) => {
            return +a.textContent - +b.textContent;
        });

    document.querySelectorAll('.diapason').forEach(elem => {
        elem.classList.remove('_choosed');
        addToCartButtonStatus.date = false
    });

    arr.forEach(elem => {
        if (elem.classList.contains('_choosed')) {
            elem.classList.remove('_choosed');
        }
        else {
            elem.classList.add('_choosed');
            addToCartButtonStatus.date = true
        }
    });

    addToCartButtonStatus.status();


    const finalDate = document.querySelector('#final-date');

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

    if (arr.length == 1) {
        outputText = `${first.textContent}.${montStarthNum}.${yearStart}`;
        outputDate = `${monthStartName} ${first.textContent}, ${yearStart}`;
    }
    else {
        outputText = `${first.textContent}.${montStarthNum}.${yearStart} — ${last.textContent}.${montEndNum}.${yearEnd}`;
        outputDate = `${monthStartName} ${first.textContent}, ${yearStart} — ${monthEndName} ${last.textContent}, ${yearEnd}`;
    }
    finalDate.textContent = outputText;
    finalDate.dataset.date = outputDate;

}

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
