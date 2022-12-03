
import Swiper from 'swiper';

function reviewSlider() {
    const reviewSlides = document.querySelectorAll('.experience__reviewes-item');
    if (reviewSlides) {
        new Swiper('.experience__reviewes .swiper', {
            loop: true,
            slidesPerView:'auto',
        })
    }
}

reviewSlider();