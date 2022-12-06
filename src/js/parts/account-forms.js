// если емаил уже существует добавлеям тегу form класс _exists 

document.addEventListener('DOMContentLoaded', function (e) {

    const registerPasswordElem = document.querySelector('#password');
    const passwordsAllowElem = document.querySelector('.passwords-allow');
    const generatePasswordElem = document.querySelector('.register-password-generate');

    const showPasswordElem = document.querySelectorAll('.show-password');
    if (showPasswordElem.length) {
        showPasswordElem.forEach(elem => {
            elem.style.display = 'none';
        })
    }


    document.addEventListener('click', function (e) {
        let targetEl = e.target;
        if (targetEl.classList.contains('register-password-generate')) {
            registerPasswordElem.value = generatePassword();
            document.querySelector('.show-password').style.display = 'block';

            formRemoveError(registerPasswordElem)
        }

        if (targetEl.classList.contains('show-password')) {
            targetEl.classList.toggle('_visible');
            const password = targetEl.closest('.form-item').querySelector('input');
            if (password.type == 'password') {
                password.type = 'text'
            }
            else {
                password.type = 'password'
            }
        }
    })


    document.addEventListener('input', function (e) {
        let targetEl = e.target;

        if (targetEl.classList.contains('password')) {
            if (targetEl.value != '') {

                if (targetEl.closest('.register')) {
                    passwordsAllowElem.style.display = 'none';
                    generatePasswordElem.style.display = 'none';
                }
                targetEl.closest('.form-item').querySelector('.show-password').style.display = 'block';
            }
            else {
                if (targetEl.closest('.register')) {
                    passwordsAllowElem.style.display = 'block';
                    generatePasswordElem.style.display = 'block';
                }
                targetEl.closest('.form-item').querySelector('.show-password').style.display = 'block';
            }
        }

        if (targetEl.hasAttribute('data-required')) {
            if (targetEl.getAttribute("type") !== 'text') {
                targetEl.value = targetEl.value.replace(/\s+/gi, '')
            }

            if (targetEl.closest('.register')) {
                const error = formValidate(targetEl);
                activateFormButton(error)
                console.log(error);
            }
        }
    })

    const form = document.querySelector('.form');
    if (form) {
        form.addEventListener('submit', formSend);
    }
    
    async function formSend(e) {
        e.preventDefault();
        const inputs = document.querySelectorAll('[data-required]');
        let error = 0;
        inputs.forEach(input => {
            error = formValidate(input);
        })

        activateFormButton(error);

        let formData = new FormData(form);

        if (error === 0) {

            form.classList.add('_sending');
            let response = await fetch('user-register.php', {
                method: 'POST',
                body: formData
            })

            if (response.ok) {
                alert("ok");
            }
            else {
                alert("Ошибка");
            }
        }
        else {
            alert('Заполните обязательные поля');
        }
    }

    function formValidate(input) {
        let error = 0;

        if (input.getAttribute("type") === "password") {
            const reg = /[!'*+/=^_`{|}~\-]/;
            if (input.value.length < 8 || reg.test(input.value) == true) {
                formAddError(input);
                error++;
            }
            else {
                formRemoveError(input);
            }
        }
        else {
            if (input.value === '') {
                formAddError(input);
                error++;
            }
            else {
                formRemoveError(input);
            }
        }
        return error;
    }

    function formAddError(input) {
        input.closest('.form-item').classList.add('_novalid');
        input.classList.add('_novalid');
    }

    function formRemoveError(input) {
        input.closest('.form-item').classList.remove('_novalid');
        input.classList.remove('_novalid');
    }

    function activateFormButton(error) {
        const inputs = [...document.querySelectorAll('[data-required]')];
        const sendButton = form.querySelector('button');
        inputs.every((input) => {
            if (input.value !== '' && error == 0) {
                form.classList.add('_valid')
                sendButton.removeAttribute('disabled');
                return true;
            }
            else {
                form.classList.remove('_valid')
                sendButton.setAttribute('disabled', true);
                return false;
            }
        })
    }

    function generatePassword() {
        const randomarr = ['$', '%', '&', '?', '#', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

        function randomCeloe(min, max) {
            let rand = min + Math.random() * (max + 1 - min);
            return Math.floor(rand);
        }

        let password = '';
        for (let i = 0; i < 8; i++) {
            const value = randomCeloe(0, randomarr.length - 1);
            const item = randomarr[value]
            password += item;
        }
        return password;
    }
})