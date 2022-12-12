// выбранные даты в основном календаре

export function getChoosedDates(dayElement) {
    const defaultText = 'choose your dates';
    const openCalendarButton = document.querySelector('.journey__form-button[id="open-calendar"]');
    const outputChoosedDate = document.querySelector('.calendar__bottom span');
    const calendar = document.querySelector('.item-form[data-id="open-calendar"]');

    if (dayElement.classList.contains('enabled')) {
        const day = dayElement.textContent;

        const choosedDays = calendar.querySelectorAll('.enabled[data-choosed="true"]');
        let outputText = '';
        if (choosedDays.length) {
            const first = choosedDays[0];
            const last = choosedDays[choosedDays.length - 1];

            const monthStart = first.closest('.month').dataset.month;
            const montStarthNum = first.closest('.month').dataset.monthnum;
            const yearStart = first.closest('.month').dataset.year;

            const monthEnd = last.closest('.month').dataset.month;
            const montEndNum = last.closest('.month').dataset.monthnum;
            const yearEnd = last.closest('.month').dataset.year;


            // вывод выбранный дат в соотв. элементы 
            if (choosedDays.length == 1) {
                outputText = `${monthStart} ${day}`;
                openCalendarButton.setAttribute('data-date', `${day}.${montStarthNum}.${yearStart}`)
            }
            else {
                outputText = `${monthStart} ${first.textContent} — ${monthEnd} ${last.textContent}`;
                openCalendarButton.setAttribute('data-date', `${first.textContent}.${montStarthNum}.${yearStart} — ${last.textContent}.${montEndNum}.${yearEnd}`)
            }
        }
        else {
            outputText = defaultText;
            openCalendarButton.removeAttribute('data-date');
        }


        outputChoosedDate.textContent = outputText;
    }
}

export function setChoosedDates(activeButton) {
    if (activeButton.id == 'open-calendar') {
        const choosedDates = activeButton.dataset.date;
        if (choosedDates) {
            activeButton.classList.add('_choosed');
            activeButton.querySelector('span').textContent = choosedDates;
        }

        else {
            activeButton.classList.remove('_choosed');
            activeButton.querySelector('span').textContent = 'dates';
        }
    }
}
