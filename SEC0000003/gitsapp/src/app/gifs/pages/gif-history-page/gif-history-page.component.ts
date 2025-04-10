import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {Gif} from '@interfaces/gifs/gif.interface';
import {GifHistoryService} from '../../services/gif-history.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {GifsListComponent} from '../../components/gifs-list/gifs-list.component';


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
  public queryParams: Observable<Params> = inject(ActivatedRoute).params;
  public querySubscription:Subscription = new Subscription();

  public historyGifs = signal<Gif[]>([]) ;

  // services
  public gifHistoryService = inject(GifHistoryService);

  ngOnInit() {
    this.querySubscription = this.queryParams.subscribe(params =>{
      console.log(params);
      this.historyGifs.set( this.gifHistoryService.searchHistory()[ params['query'] ] );
      console.table( this.historyGifs() );
    })
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
