// меню при клике

function menuAction() {
    const menuButton = document.querySelector('.header__burger');
    const menu = document.querySelector('.menu');
    const body = document.body;
    if (menuButton) {
        menuButton.addEventListener('click', function () {
            menu.classList.toggle('_open');
            menuButton.classList.toggle('_active');
            body.classList.toggle('_noscroll');
        })
    }
}
menuAction();