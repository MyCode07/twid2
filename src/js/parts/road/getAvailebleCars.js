// доступные машины для маршута в зависомости от выбранного диапазона
 
export function getAvailebleCars(cars) {
    const outputCars = document.querySelector('#road__calendar-cars ol');
    if (cars.length) {
        let output = '';
        for (let i = 0; i < cars.length; i++) {
            const car = cars[i];
            output += `<li>${car}</li>`;
        }
        const existCars = outputCars.querySelectorAll('li')
        if (existCars.length) {
            existCars.forEach(item => {
                item.remove();
            })
        }
        outputCars.insertAdjacentHTML('beforeend', output);
    }
}