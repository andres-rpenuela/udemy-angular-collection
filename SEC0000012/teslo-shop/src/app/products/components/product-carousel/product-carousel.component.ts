import {AfterViewInit, Component, ElementRef, input, OnChanges, SimpleChanges, viewChild} from '@angular/core';

// core version + navigation, pagination modules:
import Swiper from 'swiper';
import {Navigation, Pagination} from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {ProductImagePipe} from '@pipe/product-image-pipe';

@Component({
  selector: 'product-carousel',
  imports: [
    ProductImagePipe
  ],
  templateUrl: './product-carousel.component.html',
  styleUrl: './product-carousel.component.css'
})
export class ProductCarouselComponent implements AfterViewInit, OnChanges{
  images = input.required<string[]>();
  swiperDiv = viewChild.required<ElementRef>('swiperDiv');

  private swiper: Swiper | undefined = undefined;

  ngOnChanges(changes: SimpleChanges) {
    console.log( changes );

    // si no cmaiba la propiedad images, no hacer nada
    if( !changes['images']) return;

    // si es el primer cambio (carga), no hacer nada
    if( changes['images'].firstChange ){
      return;
    }

    //this.swiperInit(changes['images'])
    if( !this.swiper ) return;

    // reiniciar el swiper
    this.swiper.destroy(true,true);
    this.swiperInit();
  }

  ngAfterViewInit() {
    const element = this.swiperDiv().nativeElement;

    // si no exite
    if (!element) return;

    console.log({element});
    this.swiperInit();

  }

  public swiperInit(){
    const element = this.swiperDiv().nativeElement;

    // const swiper
    this.swiper = new Swiper(element, {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      modules:[
        Navigation, Pagination
      ],
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }
}
