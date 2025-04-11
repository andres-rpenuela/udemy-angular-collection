import {Component, computed, inject, OnDestroy, OnInit, Signal, signal} from '@angular/core';
import {Gif} from '@interfaces/gifs/gif.interface';
import {GifHistoryService} from '../../services/gif-history.service';
import {ActivatedRoute, Params} from '@angular/router';
import {map, Observable, Subscription} from 'rxjs';
import {GifsListComponent} from '../../components/gifs-list/gifs-list.component';
import {toSignal} from '@angular/core/rxjs-interop';
import {GifLocalStoreService} from '../../services/gif-local-store.service';


@Component({
  selector: 'app-gif-history-page',
  imports: [
    GifsListComponent
  ],
  templateUrl: './gif-history-page.component.html',
  styleUrl: './gif-history-page.component.css',
  standalone: true
})
export default class GifHistoryPageComponent implements OnInit, OnDestroy{

  // recoleccion de parametros
  // public queryParams: Observable<Params> = inject(ActivatedRoute).params;
  // public querySubscription:Subscription = new Subscription();

  // extraer el param 'query" como una señal
  public query: Signal<string> = toSignal( inject(ActivatedRoute).params.pipe(
    map( (params: Params) => params['query'])
  ));
  public historyGifs: Signal<Gif[]> = computed( () => {
      return this.gifHistoryService.getHistoryGifs( this.query() )
  })


  // services
  public gifHistoryService : GifHistoryService = inject(GifHistoryService);

  ngOnInit() {
    // this.querySubscription = this.queryParams.subscribe(params =>{
    //   console.log(params);
    //   this.historyGifs.set( this.gifHistoryService.searchHistory()[ params['query'] ] );
    //   console.table( this.historyGifs() );
    // })
  }

  ngOnDestroy() {
    // this.querySubscription.unsubscribe();
  }
}
