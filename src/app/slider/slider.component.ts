import { Component, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SliderComponent {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor() {}

  slideData = [
    '../../assets/image/1.jpg',
    '../../assets/image/2.jpg',
    '../../assets/image/3.jpg',
    '../../assets/image/4.jpg',
    '../../assets/image/5.jpg',
    '../../assets/image/6.jpg',
  ];

  config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    autoHeight: true,
    allowTouchMove: true,
    autoplay: {
      delay: 600,
      disableOnInteraction: true,
    },
    breakpoints: {
      1024: {
        slidesPerView: 4,
      },
      500: {
        slidesPerView: 3,
      },
      400: {
        slidesPerView: 2,
      },
      300: {
        slidesPerView: 1,
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    loop: true,
  };
}
