import {Component, inject} from '@angular/core';
import {GifsListComponent} from '../../components/gifs-list/gifs-list.component';
import {GiphyService} from '../../services/giphy.service';

@Component({
  selector: 'app-search-page',
  imports: [
    GifsListComponent
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css',
  standalone: true
})
export default class SearchPageComponent {

  protected service:GiphyService = inject(GiphyService);

  onSearch(query:string):void {
    console.log(query); // debug
    this.service.searchGifs(query);
  }
}
