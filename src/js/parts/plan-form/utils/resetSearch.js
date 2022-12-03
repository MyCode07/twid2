import { addToCartButtonStatus } from "../plan-form.js";

export function resetSearch(searchButton) {

    if (searchButton.classList.contains('_active')) {
        if (searchButton.classList.contains('_reset')) {
            searchButton.classList.remove('_active')
            searchButton.dataset.disabled = "true";
            searchButton.querySelector('span').textContent = 'Search';

            document.querySelector('.form__popup').classList.remove('_open')
            document.querySelectorAll('input[name="form-country-item"]:checked').forEach(item => {
                item.checked = false;
            });
            document.querySelectorAll('input[name="form-car-item"]:checked').forEach(item => {
                item.checked = false;
            });
            document.querySelectorAll('.enabled[data-choosed="true"]').forEach(item => {
                item.removeAttribute('data-choosed');
            });

            document.querySelector('.calendar__bottom').querySelector('span').textContent = 'choose your dates';

            const chooseAllbuttons = document.querySelectorAll('.form__popup-item-all[data-all="true"]');
            if (chooseAllbuttons.length) {
                chooseAllbuttons.forEach(item => {
                    item.dataset.all = 'false';
                    item.textContent = 'Check all';
                });
            }

            const openCountriesButton = document.querySelector('#open-countries');
            openCountriesButton.classList.remove('_choosed')
            openCountriesButton.querySelector('span').textContent = 'Countries';

            const openCarsButton = document.querySelector('#open-cars');
            openCarsButton.classList.remove('_choosed')
            openCarsButton.querySelector('span').textContent = 'Cars';

            const openCalendarButton = document.querySelector('#open-calendar');
            openCalendarButton.classList.remove('_choosed')
            openCalendarButton.querySelector('span').textContent = 'Dates';
            openCalendarButton.removeAttribute('data-date');

            addToCartButtonStatus.status()
        }
        else {
            searchButton.classList.add('_reset');
            searchButton.querySelector('span').textContent = 'Clear all';
        }
    }
    else {
        searchButton.classList.remove('_reset')
        searchButton.querySelector('span').textContent = 'Search';
    }
}