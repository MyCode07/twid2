document.addEventListener('DOMContentLoaded', function (e) {

    function generatePassword() {
        const randomarr = ['$', '%', '&', '@', '#', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

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

    const registerPasswordElem = document.querySelector('#password');
    const showPasswordElem = document.querySelector('.show-password');

    if (showPasswordElem) {
        showPasswordElem.style.display = 'none';
    }

    document.addEventListener('click', function (e) {
        let targetEl = e.target;
        if (targetEl.classList.contains('register-password-generate')) {
            registerPasswordElem.value = generatePassword();
            showPasswordElem.style.display = 'block';
        }

        if (targetEl.classList.contains('show-password') && registerPasswordElem.value != '') {

            if (registerPasswordElem.type == 'password') {
                registerPasswordElem.type = 'text'
                targetEl.textContent = 'hide password';
            }
            else {
                registerPasswordElem.type = 'password'
                targetEl.textContent = 'show password';
            }
        }
    })

    document.addEventListener('input', function (e) {
        let targetEl = e.target;

        if (targetEl.classList.contains('password')) {
            if (targetEl.value != '') {
                showPasswordElem.style.display = 'block';
            }
            else {
                showPasswordElem.style.display = 'none';
            }
        }
    })
})