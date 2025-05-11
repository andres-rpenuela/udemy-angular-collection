import {Component, computed, ElementRef, inject, Signal, signal, viewChild, WritableSignal} from '@angular/core';
import {GifsListComponent} from '../../components/gifs-list/gifs-list.component';
import {GiphyService} from '../../services/giphy.service';
import {Gif} from '@interfaces/gifs/gif.interface';


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
    //GifsListComponent
  ],
  templateUrl: './trending-page.component.html',
  styleUrl: './trending-page.component.css',
  standalone: true
})
export default class TrendingPageComponent{
  // nota: con readonly, no se puede hacer .set(x) o .updated(x) si es uana señal, o cambiar el valor si es una propiedad

  //protected readonly imageUrls = imageUrls;
  //protected imageUrls:WritableSignal<string[]> = signal(imageUrls)

  // servico, inyecta
  giphyService:GiphyService = inject(GiphyService);

  // ref., html
  public groupDivRef : Signal<ElementRef | undefined> = viewChild<ElementRef>('groupDiv');

  public gifsGroup :Signal<Gif[][]> = computed<Gif[][]>( () =>{
    return this.convertArrayToMatrix( this.giphyService.gifs(),3);
  });

  convertArrayToMatrix(source: any[], columns: number): any[][] {
    const result: any[][] = [];
      for (let i = 0; i < source.length; i += columns) {
        result.push(source.slice(i, i + columns));
      }
    return result; // [ [g1,g2,g3,gN], [g1,g2,g3.gN] ...]

  }

  onScroll(event : Event){
    //console.log(event);  // debug

    // scrollDiv es la referencia al <div id="groupDiv">
    const scrollDiv = this.groupDivRef()?.nativeElement ?? null; // carga div y todos sus hijos
    console.log(scrollDiv); // debug

    // si no hay un scrollDiv no hace nada, para estar evitnado verificar con el operador ?
    if( !scrollDiv ) return;

    // variables
    const scrollTop = scrollDiv.scrollTop; // Posicion de scroll que hay
    const clientHeight = scrollDiv.clientHeight; // Tamaño de la pantalla disponible
    const scrollHeight = scrollDiv.scrollHeight; // Tamaño maximo posible del scroll
    const isAtBottom = scrollTop + clientHeight >= (scrollHeight-(scrollHeight * 0.15)); // comprueba cuando esta scroll el 85% del div

    console.log( "scrollTop: "+ scrollTop+", clientHeight:"+ clientHeight+ ", scrollHeight: "+scrollHeight," is 85% scroll: " +isAtBottom );


  }
}
