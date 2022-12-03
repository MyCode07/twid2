export function activeateSearchButton() {
    const activeButtons = document.querySelectorAll('.journey__form-button._choosed');
    const openSeachButton = document.querySelector('.journey__form-button[id="open-search"]');
    if (activeButtons.length == 3) {
        openSeachButton.removeAttribute('data-disabled');
    }
    else {
        openSeachButton.setAttribute('data-disabled', true);
    }
}