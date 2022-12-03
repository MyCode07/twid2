// слайдер

import { Swiper, Navigation, Pagination, Grid } from 'swiper';

// соновной календарь и календарь маршрутов
import { Calendar, IteneraryCalendar } from './calendar.js';

// создаем слайдер из календаря
import { setCalendarSlider } from './utils/setCalendarSlider.js';

// выбор дней на основном календаре
import { clickOnDay } from './utils/clickOnDay.js';

// количество выбранных маршрутов и машин
import { getChusedItenerariesAndChoosedCars } from './utils/getChusedItenerariesAndChoosedCars.js';

// выбранные дни на основном календаре
import { getChoosedDates, setChoosedDates } from './utils/choosedDates.js';

// актицвация кнопи поиска
import { activeateSearchButton } from './utils/activeateSearchButton.js';

// выбор доступного дизапазона дат конкретного маршрута
import { chooseEnabledDatesDiapason } from './utils/chooseEnabledDatesDiapason.js';

// добавление в корзину
import { addToCart } from './utils/addToCart.js';

// очистит пписк
import { resetSearch } from './utils/resetSearch.js';


// проверка статуса активностикнопки поиска
const finalChoosedCar = document.querySelector('#final-car');
const finalChoosedItenerary = document.querySelector('#final-itenerary');
const totalPrice = document.querySelector('#total-price');
const preOrderPrice = document.querySelector('#preorder-price');
const addtoCartButton = document.querySelector('.add-to-cart');
export const addToCartButtonStatus = {
    itenerary: false,
    car: false,
    date: false,
    status: function () {
        if (this.itenerary == true && this.car == true && this.date == true) {
            addtoCartButton.removeAttribute('disabled');
        }
        else {
            addtoCartButton.setAttribute('disabled', true);
        }
    }
}

document.addEventListener('DOMContentLoaded', function (e) {

    // основной календарь
    const calendarBody = document.querySelector('.form__popup-calendar .calendar__body');
    if (calendarBody) {
        const calendar = new Calendar(calendarBody, allDisabledDates);
        calendar.setCalendar();
        setCalendarSlider('.form__popup-calendar .calendar', calendarBody);
    }


    // слайдер маршрутов в поиске
    const searchTopSlides = document.querySelectorAll('.search__top li');
    if (searchTopSlides.length) {
        new Swiper('.search__top .swiper', {
            slidesPerView: 'auto',
            spaceBetween: 40,
        })
    }

    // клики
    const searchButton = document.querySelector('#open-search');
    document.addEventListener('click', (e) => {
        let targetEl = e.target;

        // клик на кнопку выбрать все направления
        if (targetEl.classList.contains('form__popup-item-all')) {
            const country = targetEl.closest('.item-form__type-item');
            let clicked = targetEl.dataset.all;
            let allInput = country.querySelectorAll('input');

            // меняю текст и соосояние кнопки выбрать все направления
            if (clicked == 'false') {
                targetEl.dataset.all = 'true';
                targetEl.textContent = 'Reset';
                allInput.forEach(element => {
                    element.checked = true
                });
            }
            else {
                targetEl.dataset.all = 'false';
                targetEl.textContent = 'Check all';
                allInput.forEach(element => {
                    element.checked = false;
                });
            }

        }

        // по кликуна название страны открываю список направлений 
        if (targetEl.classList.contains('type__item-title')) {
            const formItem = targetEl.closest('.item-form');
            const buttons = formItem.querySelectorAll('.type__item-title');

            // в открытом соостоянии оставляем только 1 страну
            buttons.forEach(element => {
                let open = element.dataset.open;
                if (open == 'true') {
                    element.dataset.open = 'false';
                }
            });

            // при смене атрибута data-open меняется состояние кнопки страны и выпадатсыцего списка направлений
            let open = targetEl.dataset.open;
            if (open == 'true') {
                targetEl.dataset.open = 'false';
            }
            else {
                targetEl.dataset.open = 'true';
            }
        }

        // клик на активный день на основном календаре
        if (targetEl.classList.contains('enabled') && targetEl.closest('[data-id="open-calendar"]')) {
            clickOnDay(targetEl)
            getChoosedDates(targetEl);
        }

        // основной попап 
        const formPopup = document.querySelector('.form__popup');

        // клик на кнопки открывающие попап
        if (targetEl.classList.contains('journey__form-button')) {


            const activeButton = document.querySelector('.journey__form-button._active')
            if (activeButton) {
                getChusedItenerariesAndChoosedCars(activeButton);
                setChoosedDates(activeButton)
                activeateSearchButton()
                activeButton.classList.remove('_active');
            }

            const id = targetEl.id;
            const popups = document.querySelectorAll('.item-form');
            popups.forEach(popup => {

                if (popup.classList.contains('_open')) {
                    popup.classList.remove('_open')
                }

                if (popup.dataset.id == id) {
                    if (id == 'open-search') {
                        if (!targetEl.hasAttribute('data-disabled')) {
                            formPopup.classList.add('_open');
                            popup.classList.add('_open')
                            targetEl.classList.add('_active')
                            resetSearch(targetEl);
                        }
                    }

                    else {
                        formPopup.classList.add('_open');
                        popup.classList.add('_open')
                        targetEl.classList.add('_active')

                        if (searchButton.classList.contains('_active')) {
                            searchButton.classList.add('_reset');
                            searchButton.querySelector('span').textContent = 'Clear all';
                        }
                        else {
                            searchButton.classList.remove('_reset')
                            searchButton.querySelector('span').textContent = 'Search';
                        }
                    }
                }
            })

        }

        // закрытие попапов
        if (!targetEl.closest('.form__popup') && !targetEl.classList.contains('journey__form-button') &&
            !targetEl.closest('.cars__popup') && !targetEl.closest('.basket__popup') && formPopup && formPopup.classList.contains('_open')) {

            formPopup.classList.remove('_open');
            const activeButton = document.querySelector('.journey__form-button._active')
            if (activeButton) {
                getChusedItenerariesAndChoosedCars(activeButton);
                setChoosedDates(activeButton);
                activeateSearchButton()
                activeButton.classList.remove('_active');
            }
        }

        if (targetEl.classList.contains('item-form__close')) {
            formPopup.classList.remove('_open');
            const activeButton = document.querySelector('.journey__form-button._active')
            if (activeButton) {
                getChusedItenerariesAndChoosedCars(activeButton);
                setChoosedDates(activeButton);
                activeateSearchButton()
                activeButton.classList.remove('_active');
            }
        }

        // открытие попапа выбора машин конкретного маршрута
        if (targetEl.classList.contains('open__cars-popup')) {
            const checkbox = targetEl.closest('label').querySelector('input');
            if (checkbox.checked) {
                document.querySelector('.cars__popup').classList.add('_open');
            }
        }

        // закритие попапа выбора машин конкретного маршрута
        if (targetEl.classList.contains('cars__popup-close') || targetEl.classList.contains('cars__popup-overlay')) {
            document.querySelector('.cars__popup').classList.remove('_open');
        }

        // добавление в корзину
        if (targetEl.classList.contains('add-to-cart')) {
            addToCart();
            document.querySelector('.basket__popup').classList.add('_open');
        }

        // закрытие корзины
        if (targetEl.classList.contains('basket__popup-close') || targetEl.classList.contains('basket__popup-overlay')) {
            document.querySelector('.basket__popup').classList.remove('_open');
        }

        // клик на дипазон дней на календаре маршрута
        if (targetEl.classList.contains('diapason') && targetEl.closest('[data-id="open-search"]')) {
            chooseEnabledDatesDiapason(targetEl);
        }

    });

    // запусакем календарь но не вызываем ее создание это будем делать при выборе или изменении маршрута
    const searchCalendarBody = document.querySelector('.search__calendar .calendar__body');
    const calendar = new IteneraryCalendar(searchCalendarBody, iteneraryEnabledDates);

    // инпуты
    document.addEventListener('input', function (e) {
        let targetEl = e.target;

        // выбор машины в попапе машин 
        if (targetEl.classList.contains('auto__cart-checkbox')) {
            const checkBoxes = document.querySelectorAll('.auto__cart-checkbox:checked');

            if (checkBoxes.length >= 1) {
                checkBoxes.forEach(input => {
                    input.checked = false
                });
                targetEl.checked = true

                finalChoosedCar.innerHTML = targetEl.id;
                finalChoosedCar.dataset.mark = targetEl.dataset.mark;
                totalPrice.innerHTML = targetEl.dataset.price;
                preOrderPrice.innerHTML = targetEl.dataset.preorder;

                addToCartButtonStatus.car = true;
            }

            else {
                targetEl.checked = false

                finalChoosedCar.innerHTML = '<hr>';
                finalChoosedCar.dataset.mark = '';
                totalPrice.innerHTML = '<hr>';
                preOrderPrice.innerHTML = '<hr>';

                addToCartButtonStatus.car = false;
            }

            addToCartButtonStatus.status();
        }

        // выбор маршрута в попапе поиска и смена календаря под этот маршрут
        if (targetEl.classList.contains('final-itenerary-input')) {

            // при выборе нового маршрута обновляем календарь под выбранный маршрут
            calendar.updateCalendar(iteneraryEnabledDates2);
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

    })

    // наведение на маршруты и на машины
    const itemForms = document.querySelectorAll('.item-form');
    if (itemForms.length) {
        itemForms.forEach(item => {
            const hoverElements = item.querySelectorAll('.item-hover');
            hoverElements.forEach(el => {
                const id = el.dataset.id

                // навадение на маршрут показывает соответствующий данному маршруту блок информацию
                el.addEventListener('mouseenter', function (e) {

                    // проверка идет по классу и атрибуту data-id, data-id должны быть одинаковые для элемента маршрута и ее блока с информацией
                    const info = document.querySelector(`.item-hover__info[data-id="${id}"]`);
                    if (info) {
                        info.setAttribute('data-show', true);
                    }
                })

                // когда наведение убрано проверяем на наличе атрибута data-show и если есть убираем
                el.addEventListener('mouseleave', function (e) {

                    const info = document.querySelector(`.item-hover__info[data-id="${id}"]`);
                    if (info && info.hasAttribute('data-show')) {
                        info.removeAttribute('data-show');
                    }
                })
            })
        })
    }

    // изменение места карты маршрута в каозрине на мобильных устройствах
    const basketItenerary = document.querySelector('.basket__popup-info-movement')
    if (basketItenerary && window.innerWidth <= 768) {
        basketItenerary.after(document.querySelector('.basket__popup-map'));
    }
})



// это для основного календаря на 1 год
// для этого календаря нужны только неактивные даты
const allDisabledDates = {
    'disabledDays': [
        ['2022.11.22'],
        ['2022.11.28'],
        ['2022.12.1'],
        ['2022.12.2'],
        ['2022.12.4'],
        ['2022.12.5'],
        ['2023.1.10'],
        ['2023.6.6'],
    ]
}

/* а для других календарей т.к. они динамичные и в 
зависимости от кликов меняются и меняются соответтвенные даты
НУЖНЫ соотв. даты - т.е. год и месяц этого календаря
*/

// const iteneraryDisabledDates = {
//     'dates': [
//         {
//             'year': 2022,
//             'month': 11,
//             'enabledDays': [29, 30]
//         },
//         {
//             'year': 2022,
//             'month': 12,
//             'enabledDays': [1, 2, 3, 18, 19, 20, 25]
//         },
//         {
//             'year': 2023,
//             'month': 1,
//             'enabledDays': -1
//         },
//         {
//             'year': 2023,
//             'month': 2,
//             'enabledDays': 'full'
//         }
//     ]
// }

const iteneraryEnabledDates = {
    'dates': [
        {
            'year': 2022,
            'month': 11,

        },
        {
            'year': 2022,
            'month': 12,
        },
        {
            'year': 2023,
            'month': 1,
        },
        {
            'year': 2023,
            'month': 2,
        }
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

const iteneraryEnabledDates2 = {
    'dates': [
        {
            'year': 2023,
            'month': 1,
        },
        {
            'year': 2023,
            'month': 2,
        }
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
