import { FreeMode, Navigation, SwiperOptions } from 'swiper';

export const swiperOptions: SwiperOptions = {
  modules: [Navigation, FreeMode],
  spaceBetween: 10,
  freeMode: {
    enabled: true,
    momentumRatio: 0.75,
    momentumVelocityRatio: 1.5,
  },
  navigation: {
    enabled: false,
  },
  slidesPerView: 3.1,
  slidesPerGroup: 2,
  speed: 700,
  grabCursor: true,
  breakpoints: {
    568: {
      slidesPerView: 4.1,
      spaceBetween: 15,
      navigation: {
        enabled: false,
      },
    },
    1024: {
      slidesPerView: 6,
      spaceBetween: 20,
      navigation: {
        enabled: true,
      },
      freeMode: {
        enabled: false,
      },
    },
    1440: {
      slidesPerView: 8,
      spaceBetween: 10,
      navigation: {
        enabled: true,
      },
      freeMode: {
        enabled: false,
      },
    },
  },
};
