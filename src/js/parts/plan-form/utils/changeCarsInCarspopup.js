// загрузка иа замена машин в попапе

export function changeCarsInCarspopup(checkbox, data) {
    const outputElem = document.querySelector('.cars__popup-grid');
    const existCars = document.querySelectorAll('.auto__cart');

    // если есть машиныв попапе удалеям
    if (existCars.length) {
        existCars.forEach(car => {
            car.remove();
        })
    }

    // проверяем на соответствие и добавляем новые машины 
    if (checkbox && data) {
        data.forEach(item => {
            if (checkbox.id == item.id) {
                const cars = item.cars;

                let carItems = '';
                for (let i = 0; i < cars.length; i++) {
                    const car = cars[i];
                    carItems += `
            <div class="auto__cart">
                <input type="checkbox" class="auto__cart-checkbox" id="${car.id}" data-id="${car.company} ${car.mark}"
                    data-info="${car.info}" hidden data-price="${car.price}" data-preorder="${car.preorder_price}">
                <label for="${car.id}">
                    <div class="auto__cart-content">
                        <h4>${car.company} <span>${car.mark}</span></h4>
                        <p>${car.info}</p>
                        <img src="${car.image}" alt="">
                    </div>
                </label>
            </div>
        `;
                }
                outputElem.insertAdjacentHTML('beforeend', carItems);
            }
        })
    }
}