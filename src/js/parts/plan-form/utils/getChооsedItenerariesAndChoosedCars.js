// количество выбранных машин и маршрутов на начал\ных этамах

function getChoosedCounts(checkboxName, activeButton, type) {
    const checkedInputs = [...document.querySelectorAll(`input[name="${checkboxName}"]`)];
    const arr = [];

    checkedInputs.forEach(checkbox => {
        if (checkbox.checked) {
            arr.push(checkbox);
        }
    });

    let empty = '';
    let one = '';
    let many = '';

    switch (type) {
        case 'open-countries':
            empty = 'countries';
            one = 'itenerary';
            many = 'iteneraries';
            break;

        case 'open-cars':
            empty = 'cars';
            one = 'car';
            many = 'cars';
            break;
    }

    let text = '';
    if (arr.length) {
        if (arr.length == 1) {
            text = `${arr.length} ${one}`;
        }

        else {
            text = `${arr.length} ${many}`;
        }
    }
    else {
        text = empty;
    }

    if (activeButton.id == type) {

        activeButton.querySelector('span').textContent = text;

        if (arr.length) {
            activeButton.classList.add('_choosed');
        }
        else {
            activeButton.classList.remove('_choosed');
        }
    }
}

export function getChооsedItenerariesAndChoosedCars(activeButton) {
    getChoosedCounts('form-country-item', activeButton, 'open-countries');
    getChoosedCounts('form-car-item', activeButton, 'open-cars');
} 