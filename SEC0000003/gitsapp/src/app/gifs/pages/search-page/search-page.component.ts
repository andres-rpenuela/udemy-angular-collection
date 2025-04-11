import {Component, inject, OnDestroy, signal, WritableSignal} from '@angular/core';
import {GifsListComponent} from '../../components/gifs-list/gifs-list.component';
import {GiphyService} from '../../services/giphy.service';
import {Gif} from '../../interfaces/gif.interface';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-search-page',
  imports: [
    GifsListComponent
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css',
  standalone: true
})
export default class SearchPageComponent implements OnDestroy{

  protected gifs :WritableSignal<Gif[]> = signal<Gif[]>([])

  // services
  protected service:GiphyService = inject(GiphyService);

  // subcription
  protected searchSubscription: Subscription = new Subscription();

  // logic
  onSearch(query:string):void {
    console.log(query); // debug

    // funcion basica
    // this.service.searchGifs(query).subscribe( resp =>{
    //   this.gifs.set(resp);
    // });

    // opcion recomendada, para cancelar la subscripcion
    this.searchSubscription = this.service.searchGifs(query).subscribe( resp =>{
      this.gifs.set(resp);
    });
  }

  public ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }
}
