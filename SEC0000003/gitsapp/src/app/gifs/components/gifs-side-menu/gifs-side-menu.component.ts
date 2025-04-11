import {Component, inject} from '@angular/core';
import {GifsSideMenuHeaderComponent} from './gifs-side-menu-header/gifs-side-menu-header.component';
import {GifsSideMenuOptionsComponent} from './gifs-side-menu-options/gifs-side-menu-options.component';
import {GifHistoryService} from '../../services/gif-history.service';

@Component({
  selector: 'gifs-side-menu',
  imports: [
    GifsSideMenuHeaderComponent,
    GifsSideMenuOptionsComponent
  ],
  templateUrl: './gifs-side-menu.component.html',
  styleUrl: './gifs-side-menu.component.css',
  standalone: true
})
export class GifsSideMenuComponent {
    public gifsHistory = inject(GifHistoryService);
}
