// показываем окоши информации при ховере (при клике на мобльках) на якоря машин и стран на главнойстранице

function showLeftBlocks() {
    const mobileWidth = 768;

    const animateTransform = [...document.querySelectorAll('._animate-transform')];
    animateTransform.forEach(item => {
        const links = [...item.querySelectorAll('._animate-transform-link')];
        const contents = [...item.querySelectorAll('._animate-transform-content')];
        show(links, contents);

        if (window.innerWidth <= mobileWidth) {
            closeOnMobile(contents);
        }
    })

    function show(hoverElems, showElems) {

        if (hoverElems && showElems) {
            for (let i = 0; i < hoverElems.length; i++) {

                const link = hoverElems[i];
                const elem = showElems[i];
                let locked = null;

                if (window.innerWidth > mobileWidth) {

                    // при наведении показываем 
                    link.addEventListener('mouseenter', function (e) {

                        locked = hoverElems.some(el => checkLocked(el));
                        if (locked == false) {
                            elem.classList.add('_show');
                            this.classList.add('_show');
                        }
                    })

                    // при уведении убираем 

                    link.addEventListener('mouseleave', function (e) {

                        locked = hoverElems.some(el => checkLocked(el));
                        if (locked == false) {
                            elem.classList.remove('_show');
                            this.classList.remove('_show');
                        }
                    })
                }

                // при клике в зависомости состояния блокировки либо фиксируем либо убираем
                link.addEventListener('click', function (e) {
                    e.preventDefault();

                    if (window.innerWidth > mobileWidth) {
                        locked = hoverElems.some(el => checkLocked(el));

                        if (!this.hasAttribute('locked')) {
                            
                            showElems.forEach(el => {
                                el.removeAttribute('locked')
                                el.classList.remove('_show');
                            });

                            hoverElems.forEach(el => {
                                el.removeAttribute('locked')
                                el.classList.remove('_show');
                            });

                            this.setAttribute('locked', true)
                            elem.classList.add('_show');
                            this.classList.add('_show');
                        }

                        else {
                            this.removeAttribute('locked')
                            elem.classList.remove('_show');
                            this.classList.remove('_show');
                        }
                    }
                    else {
                        elem.classList.add('_show');
                    }
                })
            }
        }
    }

    // проверка на блокировку ховера
    function checkLocked(el) {
        if (el.hasAttribute('locked')) {
            return true;
        }
        else {
            return false;
        }
    }

    // закрытие на мобильных устройствах
    function closeOnMobile(showElems) {
        for (let i = 0; i < showElems.length; i++) {
            const elem = showElems[i];
            const closeButton = elem.querySelector('button');

            // при лике на кнопку "X"
            closeButton.addEventListener('click', function () {
                if (elem.classList.contains('_show')) {
                    elem.classList.remove('_show');
                }
            })
        }
    }
}
showLeftBlocks();