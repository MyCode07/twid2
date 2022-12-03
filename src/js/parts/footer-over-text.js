function setFooterOvertext() {
    const footerOverText = document.querySelector('.footer__over-text');
    const string = [
        'travel',
        'with',
        'drive',
    ];

    const newString = string.map(item => {
        return item.replace(/ /g, '').split('')
    })

    if (footerOverText) {

        let letter = '';
        for (let i = 0; i < newString.length; i++) {

            let start = '<span>';
            let end = '</span>';

            for (let k = 0; k < newString[i].length; k++) {
                letter = `<i>${newString[i][k]}</i>`;
                start += letter;
            }
            start += end;

            footerOverText.insertAdjacentHTML('beforeend', start);
        }
    }

}
setFooterOvertext();