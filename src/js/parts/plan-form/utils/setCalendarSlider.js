import { Swiper, Navigation, Grid } from 'swiper';

export function setCalendarSlider(swiper, calendarBody) {

    //  calendar slider
    const calendarSwiper = document.querySelector(`${swiper}`);
    const calendarSlides = calendarSwiper.querySelectorAll('.calendar__item');
    const prevSlideButton = calendarSwiper.closest('.item-form').querySelector('.calendar__slider-prev');
    const nextSlideButton = calendarSwiper.closest('.item-form').querySelector('.calendar__slider-next');

    calendarSwiper.classList.add('swiper');
    calendarBody.classList.add('swiper-wrapper');

    if (calendarSlides.length <= 2) {
        nextSlideButton.classList.add('_hide');
    }
    else {
        nextSlideButton.classList.remove('_hide');
    }

    calendarSlides.forEach(slide => {
        slide.classList.add('swiper-slide');

        if (window.innerWidth <= 768 && calendarSlides.length >= 2) {
            slide.classList.add('_grid-slide');
        }
    })


    let lastIntex = 2
    if (window.innerWidth <= 768) {
        lastIntex = Math.floor(calendarSlides.length / 2) + 1
    }

    new Swiper(`${swiper}`, {
        modules: [
            Navigation,
            Grid
        ],

        allowTouchMove: false,

        navigation: {
            'prevEl': '.calendar__slider-prev',
            'nextEl': '.calendar__slider-next',
        },

        on: {
            slideChange: function (swiper) {
                console.log(lastIntex);

                if (swiper.activeIndex >= 1) {
                    prevSlideButton.classList.add('_active');
                }
                else {
                    prevSlideButton.classList.remove('_active');
                }

                if (swiper.activeIndex == swiper.slides.length - lastIntex) {
                    nextSlideButton.classList.add('_hide');
                }
                else {
                    nextSlideButton.classList.remove('_hide');
                }
            }
        },

        breakpoints: {
            300: {
                grid: {
                    rows: 2,
                },
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 50,
            },
            769: {
                grid: false,
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 115,
            }
        }
    })

    return;
}
