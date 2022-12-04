export function hoverOnCarsandIteneraries() {
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
}