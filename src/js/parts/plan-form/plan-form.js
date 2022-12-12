// соновной календарь и календарь маршрутов
import { Calendar } from './calendar.js';

// создаем слайдер из календаря
import { setCalendarSlider } from './utils/setCalendarSlider.js';

// выбор дней на основном календаре
import { clickOnDay } from './utils/clickOnDay.js';

// количество выбранных маршрутов и машин
import { getChооsedItenerariesAndChoosedCars } from './utils/getChооsedItenerariesAndChoosedCars.js';

// выбранные дни на основном календаре
import { getChoosedDates, setChoosedDates } from './utils/getChoosedDates.js';

// актицвация кнопи поиска
import { activeateSearchButton } from './utils/activeateSearchButton.js';

// выбор доступного дизапазона дат конкретного маршрута
import { chooseEnabledDatesDiapason } from './utils/chooseEnabledDatesDiapason.js';

// добавление в корзину
import { addToCart } from './utils/addToCart.js';

// очистит пписк
import { resetSearch } from './utils/resetSearch.js';

// показываем финальные маршруты
import { finalIteneraryInput, setFinalItenerearies } from './utils/setFinalIteneraries.js';

// загрузка машин в попап машин для финальных маршрутов
import { changeCarsInCarspopup } from './utils/changeCarsInCarspopup.js';

// наведение на маршруты и на машины
import { hoverOnCarsandIteneraries } from './utils/hoverOnCarsandIteneraries.js';

// Финальный выбор машины
import { getFinalChoosedCar } from './utils/getFinalChoosedCar.js';


// проверка статуса активности кнопки добавления в корзину
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

    // клики
    const searchButton = document.querySelector('#open-search');
    document.addEventListener('click', (e) => {
        let targetEl = e.target;

        // клик на кнопку 'выбрать все направления'
        if (targetEl.classList.contains('form__popup-item-all')) {
            const country = targetEl.closest('.item-form__type-item');
            let clicked = targetEl.dataset.all;
            let allInput = country.querySelectorAll('input');

            // меняю текст и соосояние кнопки 'выбрать все направления' в зависимоси от состояния checkbox
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

        // по клику на название страны открываю список направлений 
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

            // при смене атрибута data-open меняется состояние кнопки страны и выпадающего списка направлений
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

            // событие клика
            clickOnDay(targetEl)

            // получение выбранных дат
            getChoosedDates(targetEl);
        }

        // основной попап 
        const formPopup = document.querySelector('.form__popup');

        // клик на кнопки открывающие соотв. попапы
        if (targetEl.classList.contains('journey__form-button')) {

            // активная кнопка при клике
            const activeButton = document.querySelector('.journey__form-button._active')
            if (activeButton) {

                // получение количества выбранных маршрутов и машин
                getChооsedItenerariesAndChoosedCars(activeButton);

                // вывод выбранной даты в кнопку даты
                setChoosedDates(activeButton)

                // активация кнопки поиска если условия выполнены (см. в функции)
                activeateSearchButton()
                activeButton.classList.remove('_active');
            }

            const id = targetEl.id;

            // все попапы формы
            const popups = document.querySelectorAll('.item-form');
            popups.forEach(popup => {

                if (popup.classList.contains('_open')) {
                    popup.classList.remove('_open')
                }

                if (popup.dataset.id == id) {

                    // клик на кнопку открывающий попап поиска
                    if (id == 'open-search') {

                        // если кнопка активна
                        if (!targetEl.hasAttribute('data-disabled')) {
                            formPopup.classList.add('_open');
                            popup.classList.add('_open');
                            targetEl.classList.add('_active');

                            // загрузка финальных маршрутов по входному парамертру
                            // setFinalItenerearies('') если передаем пустой аргумент соотв. ничего и не будет
                            setFinalItenerearies(finalIteneraries)

                            // загрузка машин для соотв. маршрута (см. в функции)
                            const checkbox = document.querySelector('input[name="final-itinerary"]:checked');
                            changeCarsInCarspopup(checkbox, finalIteneraries);

                            // по умолчанию акивный первый элемент финальных маршрутов 
                            finalIteneraryInput(document.querySelector('.final-itenerary-input:checked'), firstIteneraryEnabledDates);

                            // сброс формы поска
                            resetSearch(targetEl);
                        }
                    }

                    // клики на сотальны кнопки открывающие соотв. попапы
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
                            if (document.querySelector('[data-id="open-search"]').classList.contains('_empty')) {
                                document.querySelector('[data-id="open-search"]').classList.remove('_empty')
                            }
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

                // получение количества выбранных маршрутов и машин
                getChооsedItenerariesAndChoosedCars(activeButton);

                // вывод выбранной даты в кнопку даты
                setChoosedDates(activeButton);

                // активация кнопки поиска если условия выполнены (см. в функции)
                activeateSearchButton()
                activeButton.classList.remove('_active');
            }
        }

        if (targetEl.classList.contains('item-form__close')) {
            formPopup.classList.remove('_open');
            const activeButton = document.querySelector('.journey__form-button._active')
            if (activeButton) {

                // получение количества выбранных маршрутов и машин
                getChооsedItenerariesAndChoosedCars(activeButton);

                // вывод выбранной даты в кнопку даты
                setChoosedDates(activeButton);

                // активация кнопки поиска если условия выполнены (см. в функции)
                activeateSearchButton()
                activeButton.classList.remove('_active');

                if (targetEl.closest('.item-form').dataset.id == "open-search") {
                    console.log('da');
                    if (searchButton.classList.contains('_active')) {
                        searchButton.classList.add('_reset');
                        searchButton.querySelector('span').textContent = 'Clear all';
                    }
                    else {
                        searchButton.classList.remove('_reset')
                        searchButton.querySelector('span').textContent = 'Search';
                        if (document.querySelector('[data-id="open-search"]').classList.contains('_empty')) {
                            document.querySelector('[data-id="open-search"]').classList.remove('_empty')
                        }
                    }
                }
            }
        }

        // открытие попапа выбора машин конкретного маршрута
        if (targetEl.classList.contains('open__cars-popup')) {
            const checkbox = targetEl.closest('label').querySelector('input');
            if (checkbox.checked) {


                document.querySelector('.cars__popup').classList.add('_open');

                // но мильках отключем скролл документа
                if (window.innerWidth <= 768) {
                    document.body.classList.add('_noscroll')
                }
            }
        }

        // закритие попапа выбора машин конкретного маршрута
        if (targetEl.classList.contains('cars__popup-close') || targetEl.classList.contains('cars__popup-overlay')) {
            document.querySelector('.cars__popup').classList.remove('_open');

            if (document.body.classList.contains('_noscroll')) {
                document.body.classList.remove('_noscroll')
            }
        }

        // добавление в корзину
        if (targetEl.classList.contains('add-to-cart')) {

            // (см. в функции)
            addToCart();
            document.querySelector('.basket__popup').classList.add('_open');
            window.scrollTo(0, 0);
        }

        // закрытие корзины
        if (targetEl.classList.contains('basket__popup-close') || targetEl.classList.contains('basket__popup-overlay')) {
            document.querySelector('.basket__popup').classList.remove('_open');
        }

        // клик на дипазон дней на календаре маршрута
        if (targetEl.classList.contains('diapason') && targetEl.closest('[data-id="open-search"]')) {

            // (см. в функции)
            chooseEnabledDatesDiapason(targetEl);
        }

        // при пустом поиске клик на кнопку возврата в календарь
        if (targetEl.classList.contains('back-to-search')) {
            document.querySelector('[id="open-search"]').classList.remove('_reset')
            document.querySelector('[id="open-search"]').classList.remove('_active')
            document.querySelector('[data-id="open-search"]').classList.remove('_empty')
            document.querySelector('[data-id="open-search"]').classList.remove('_open')
            document.querySelector('[data-id="open-calendar"]').classList.add('_open')
        }

    });



    // инпуты
    document.addEventListener('input', function (e) {
        let targetEl = e.target;

        // выбор машины в попапе машин 
        if (targetEl.classList.contains('auto__cart-checkbox')) {
            getFinalChoosedCar(targetEl);
        }

        // выбор маршрута в попапе поиска и смена календаря под этот маршрут
        if (targetEl.classList.contains('final-itenerary-input')) {
            finalIteneraryInput(targetEl, nextIteneraryEnabledDates);

            // загрузка машин для соотв. маршрута (см. в функции)
            changeCarsInCarspopup(targetEl, finalIteneraries);
        }
    })

    // наведение на маршруты и на машины
    hoverOnCarsandIteneraries();

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

// по умолчанию активные диапазоны для первого элемнта финальх маршрут
const firstIteneraryEnabledDates = {
    'dates': [
        {
            'year': 2023,
            'month': 1,
        },
        {
            'year': 2023,
            'month': 2,
        },
        {
            'year': 2023,
            'month': 3,
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

// по клику на маршрут в поиске получаем ее активные дапазоны
const nextIteneraryEnabledDates = {
    'dates': [
        {
            'year': 2023,
            'month': 2,
        },
        {
            'year': 2023,
            'month': 3,
        }
    ],
    'enabledDays': [
        ['2023.2.28'],
        ['2023.2.27'],
        ['2023.2.1'],
        ['2023.2.2'],
        ['2023.2.3'],
        ['2023.2.4'],
        ['2023.3.10'],
        ['2023.3.11'],
        ['2023.3.12'],
    ]
}

// финалные маршруты и их машины зависят от подоранных машин и маршрутов
const finalIteneraries = [
    {
        'id': 'f1',
        'naming': 'Cabo da Roca — Nazare. Portugal',
        'description': 'Three days journey with two nights. Hotel “Belmond”.',
        'map': 'img/countries/maps/portugal.svg',
        'cars': [
            {
                'id': 'c1',
                'company': 'ABARTH',
                'mark': '124 Spider',
                'info': '94 PS / 4-seats',
                'price': '1500',
                'preorder_price': '500',
                'image': 'img/cars/abarth/124-spider.png'
            },
            {
                'id': 'c2',
                'company': 'ABARTH',
                'mark': '125 Spider',
                'info': '95 PS / 5-seats',
                'price': '1500',
                'preorder_price': '500',
                'image': 'img/cars/abarth/124-spider.png'
            },
            {
                'id': 'c3',
                'company': 'ABARTH',
                'mark': '126 Spider',
                'info': '96 PS / 6-seats',
                'price': '1500',
                'preorder_price': '500',
                'image': 'img/cars/abarth/124-spider.png'
            }
        ]
    },
    {
        'id': 'f2',
        'naming': 'Ocean and best view roads. Portugal',
        'description': 'Three days journey with two nights. Hotel “Belmond”.',
        'map': 'img/countries/maps/portugal.svg',
        'cars': [
            {
                'id': 'c4',
                'company': 'BMW',
                'mark': 'M3',
                'info': '94 PS / 4-seats',
                'price': '1500',
                'preorder_price': '500',
                'image': 'img/cars/bmw/bmw-mark.png'
            },
            {
                'id': 'c5',
                'company': 'BMW',
                'mark': 'M5',
                'info': '95 PS / 5-seats',
                'price': '1500',
                'preorder_price': '500',
                'image': 'img/cars/bmw/bmw-mark.png'
            },
            {
                'id': 'c6',
                'company': 'BMW',
                'mark': 'M7',
                'info': '96 PS / 6-seats',
                'price': '1500',
                'preorder_price': '500',
                'image': 'img/cars/bmw/bmw-mark.png'
            }
        ]

    },
    {
        'id': 'f3',
        'naming': 'Big Portugal Journey',
        'description': 'Three days journey with two nights. Hotel “Belmond”.',
        'map': 'img/countries/maps/germany.svg',
        'cars': [
            {
                'id': 'c7',
                'company': 'AUDI',
                'mark': 'Q3',
                'info': '94 PS / 4-seats',
                'price': '1500',
                'preorder_price': '500',
                'image': 'img/cars/audi/a110.png'
            },
            {
                'id': 'c8',
                'company': 'AUDI',
                'mark': 'Q5',
                'info': '95 PS / 5-seats',
                'price': '1500',
                'preorder_price': '500',
                'image': 'img/cars/audi/a110.png'
            },
            {
                'id': 'c9',
                'company': 'AUDI',
                'mark': 'Q7',
                'info': '96 PS / 6-seats',
                'price': '1500',
                'preorder_price': '500',
                'image': 'img/cars/audi/a110.png'
            },
            {
                'id': 'c10',
                'company': 'AUDI',
                'mark': 'Q8',
                'info': '96 PS / 6-seats',
                'price': '1500',
                'preorder_price': '500',
                'image': 'img/cars/audi/a110.png'
            },
            {
                'id': 'c11',
                'company': 'AUDI',
                'mark': 'Q79',
                'info': '96 PS / 6-seats',
                'price': '1500',
                'preorder_price': '500',
                'image': 'img/cars/audi/a110.png'
            },
            {
                'id': 'c12',
                'company': 'AUDI',
                'mark': 'Q10',
                'info': '96 PS / 6-seats',
                'price': '1500',
                'preorder_price': '500',
                'image': 'img/cars/audi/a110.png'
            },
            {
                'id': 'c13',
                'company': 'AUDI',
                'mark': 'Q11',
                'info': '96 PS / 6-seats',
                'price': '1500',
                'preorder_price': '500',
                'image': 'img/cars/audi/a110.png'
            }
        ]
    },
    {
        'id': 'f4',
        'naming': 'Postcard views and best autobans. Germany',
        'description': 'Three days journey with two nights. Hotel “Belmond”.',
        'map': 'img/countries/maps/italy.svg',
        'cars': [
            {
                'id': 'c15',
                'company': 'MAZDA',
                'mark': 'MX 5',
                'info': '94 PS / 4-seats',
                'price': '1500',
                'preorder_price': '500',
                'image': 'img/cars/audi/a110.png'
            },
            {
                'id': 'c14',
                'company': 'MAZDA',
                'mark': 'MX 6',
                'info': '95 PS / 5-seats',
                'price': '1500',
                'preorder_price': '500',
                'image': 'img/cars/mazda/mx-5.png'
            }
        ]
    }
];