import { Swiper } from 'swiper';
import { IteneraryCalendar } from '../calendar.js';
import { addToCartButtonStatus } from '../plan-form.js';
import { setCalendarSlider } from './setCalendarSlider.js';

export function setFinalItenerearies(data) {
    const outputElem = document.querySelector('.search__top .swiper-wrapper');
    const existIteneraries = document.querySelectorAll('.search__top .swiper-slide');
    if (existIteneraries.length) {
        existIteneraries.forEach(slide => {
            slide.remove();
        })
    }
    if (data != '' && data != null) {
        let itenerary = '';
        let input = '';

        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            if (i == 0) {
                input = `<input class="final-itenerary-input" id="${item.naming}" type="radio" checked`;
            }
            else {
                input = `<input class="final-itenerary-input" id="${item.naming}" type="radio"`;
            }

            itenerary += `
                    <li class="swiper-slide">
                        <label for="${item.naming}" class="bold">
                            <img class="itenerary-map" src="${item.map}" alt="" hidden>
                                ${input}
                                data-descr="${item.description}"
                                name="final-itinerary" hidden>
                            <span class="bold">${item.naming}</span>
                            <button class="open__cars-popup">Choose a car</button>
                        </label>
                    </li>
                `;
        }
        outputElem.insertAdjacentHTML('beforeend', itenerary);

        // устаноавливаем слайдер маршрутов 
        new Swiper('.search__top .swiper', {
            slidesPerView: 'auto',
            spaceBetween: 40,
        })
    }
    else {
        document.querySelector('[data-id="open-search"]').classList.add('_empty');
    }
}

export function finalIteneraryInput(targetEl, enabledDays) {
    if (targetEl && enabledDays) {
        const finalChoosedItenerary = document.querySelector('#final-itenerary');
        const searchCalendarBody = document.querySelector('.search__calendar .calendar__body');
        const calendar = new IteneraryCalendar(searchCalendarBody, enabledDays);
        calendar.updateCalendar(enabledDays);
        setCalendarSlider('.search__calendar .calendar', searchCalendarBody);

        const map = targetEl.closest('label').querySelector('img.itenerary-map').cloneNode();
        const existMap = finalChoosedItenerary.closest('.search__bottom-movement').querySelector('img.itenerary-map')

        if (targetEl.checked) {
            finalChoosedItenerary.innerHTML = targetEl.id;
            finalChoosedItenerary.dataset.descr = targetEl.dataset.descr;

            if (existMap) {
                existMap.remove();
            }
            finalChoosedItenerary.after(map)

            addToCartButtonStatus.itenerary = true;
        }

        else {
            finalChoosedItenerary.innerHTML = '<hr>';
            finalChoosedItenerary.dataset.descr = '';
            addToCartButtonStatus.itenerary = false;
        }

        addToCartButtonStatus.status();
    }
}