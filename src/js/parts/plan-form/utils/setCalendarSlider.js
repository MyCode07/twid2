import { Swiper, Navigation, Pagination, Grid } from 'swiper';

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



    new Swiper(`${swiper}`, {
        modules: [
            Navigation,
            Pagination,
            Grid
        ],



        allowTouchMove: false,

        navigation: {
            'prevEl': '.calendar__slider-prev',
            'nextEl': '.calendar__slider-next',
        },

        pagination: {
            el: '.calendar__slider-pagination',
            clickable: true,
        },

        on: {
            slideChange: function (swiper) {
                if (swiper.activeIndex >= 1) {
                    prevSlideButton.classList.add('_active');
                }
                else {
                    prevSlideButton.classList.remove('_active');
                }

                if (swiper.activeIndex == swiper.slides.length - 2) {
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
