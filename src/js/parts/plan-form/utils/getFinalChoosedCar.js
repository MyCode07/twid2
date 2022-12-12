import { addToCartButtonStatus } from "../plan-form.js";

// Финальный выбор машины
export function getFinalChoosedCar(car) {
    const checkBoxes = document.querySelectorAll('.auto__cart-checkbox:checked');


    // вывод вынальный выборов в посике
    const finalChoosedCar = document.querySelector('#final-car');
    const totalPrice = document.querySelector('#total-price');
    const preOrderPrice = document.querySelector('#preorder-price');

    // смена содержание соотв. элементов в зависимост от выбранной машины
    if (checkBoxes.length >= 1) {
        checkBoxes.forEach(input => {
            input.checked = false
        });
        car.checked = true

        finalChoosedCar.innerHTML = car.dataset.id;
        finalChoosedCar.dataset.mark = car.dataset.info;
        totalPrice.innerHTML = car.dataset.price;
        preOrderPrice.innerHTML = car.dataset.preorder;

        addToCartButtonStatus.car = true;
    }
    else {
        car.checked = false

        finalChoosedCar.innerHTML = '<hr>';
        finalChoosedCar.dataset.mark = '';
        totalPrice.innerHTML = '<hr>';
        preOrderPrice.innerHTML = '<hr>';

        addToCartButtonStatus.car = false;
    }

    // проверка статуса кнопки добавления корзины
    addToCartButtonStatus.status();
}