import { Component } from '@angular/core';
import {GifsListComponent} from '../../components/gifs-list/gifs-list.component';

@Component({
  selector: 'app-trending-page',
  imports: [
    GifsListComponent
  ],
  templateUrl: './trending-page.component.html',
  styleUrl: './trending-page.component.css',
  standalone: true
})
export default class TrendingPageComponent {

}
