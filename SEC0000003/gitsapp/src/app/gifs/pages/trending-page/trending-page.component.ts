import {Component, signal, WritableSignal} from '@angular/core';
import {GifsListComponent} from '../../components/gifs-list/gifs-list.component';


const imageUrls: string[] = [
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg"
];

@Component({
  selector: 'app-trending-page',
  imports: [
    GifsListComponent
  ],
  templateUrl: './trending-page.component.html',
  styleUrl: './trending-page.component.css',
  standalone: true
})
export default class TrendingPageComponent{
  // nota: con readonly, no se puede hacer .set(x) o .updated(x) si es uana señal, o cambiar el valor si es una propiedad

  //protected readonly imageUrls = imageUrls;
  protected imageUrls:WritableSignal<string[]> = signal(imageUrls)
}
