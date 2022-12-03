function catText() {
    const textBlock = document.querySelector('._cut-onmobile');
    if (textBlock) {
        let text = textBlock.textContent;

        if (text.length > 280 && window.innerWidth <= 768) {
            textBlock.classList.add('_hide-part');
            textBlock.insertAdjacentHTML('beforeend', '<span style="display: block;" class="open-text">...</span>')
        }
        const openText = document.querySelector('.open-text');
        if (openText) {
            openText.addEventListener('click', function () {
                textBlock.classList.toggle('_hide-part');
            });
        }
    }
}
catText()