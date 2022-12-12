// текстовый  элемент над футером разбиваем строку на буквы чтобы правильно растянуть ее по всей ширины экрана вне зависомости от ее ширины

function setFooterOvertext() {
    const footerOverText = document.querySelector('.footer__over-text');

    if (footerOverText) {

        // получаем текст в массив из слов
        const string = footerOverText.innerHTML.split(' ');

        // убираем пробелы
        const newString = string.map(item => {
            return item.replace(/ /g, '').split('')
        })


        // зачищаем вывод
        footerOverText.innerHTML = ''

        let letter = '';
        for (let i = 0; i < newString.length; i++) {

            let start = '<span>';
            let end = '</span>';

            for (let k = 0; k < newString[i].length; k++) {
                letter = `<i>${newString[i][k]}</i>`;
                start += letter;
            }
            start += end;

            // выводим в элемент
            footerOverText.insertAdjacentHTML('beforeend', start);
        }
    }

}
setFooterOvertext();