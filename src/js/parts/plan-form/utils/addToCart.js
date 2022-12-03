export function addToCart() {
    const itenerary = document.querySelector('#final-itenerary').innerHTML;
    const iteneraryDescription = document.querySelector('#final-itenerary').dataset.descr;
    const car = document.querySelector('#final-car').innerHTML;
    const carMark = document.querySelector('#final-car').dataset.mark;
    const date = document.querySelector('#final-date').dataset.date;
    const totalPrice = document.querySelector('#total-price').innerHTML;
    const preorderPrice = document.querySelector('#preorder-price').innerHTML;
    const iteneraryMap = document.querySelector('.search__bottom-movement img.itenerary-map').cloneNode();
    iteneraryMap.removeAttribute('hidden')

    const basketItenerary = document.querySelector('#basket-itenerary');
    const basketIteneraryDescription = document.querySelector('#basket-itenerary-description');
    const basketDate = document.querySelector('#basket-date');
    const basketCar = document.querySelector('#basket-car');
    const basketCarMark = document.querySelector('#basket-car-mark');
    const basketTotalPrice = document.querySelector('#basket-total-price');
    const basketPreorderPrice = document.querySelector('#basket-preorder-price');
    const basketMap = document.querySelector('.basket__popup-map');
    const basketMapExist = document.querySelector('.basket__popup-map img');

    basketItenerary.innerHTML = itenerary;
    basketIteneraryDescription.innerHTML = iteneraryDescription;
    basketCar.innerHTML = car;
    basketCarMark.innerHTML = carMark;
    basketDate.innerHTML = date;
    basketTotalPrice.innerHTML = totalPrice;
    basketPreorderPrice.innerHTML = preorderPrice;
    if (basketMapExist) {
        basketMapExist.remove();
    }
    basketMap.append(iteneraryMap);
}