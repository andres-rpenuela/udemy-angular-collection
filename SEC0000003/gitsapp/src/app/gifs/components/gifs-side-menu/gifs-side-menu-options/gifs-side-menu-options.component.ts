import {Component, input} from '@angular/core';
import {MenuOption} from '../../../interfaces/menu-option.interface';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'gifs-side-menu-options',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './gifs-side-menu-options.component.html',
  styleUrl: './gifs-side-menu-options.component.css',
  standalone: true
})
export class GifsSideMenuOptionsComponent {

  historyGifs = input.required<string[]>();

  menuOptions:MenuOption[] = [
    {
      label:'Trending',
      subLabel: 'Gifs populares',
      icon: 'fa-solid fa-chart-line',
      route: '/dashboard/trending',
    },
    {
      label:'Buscador',
      subLabel: 'Buscar Gifs',
      icon: 'fa-solid fa-magnifying-glass',
      route: '/dashboard/search',
    }
  ]
}
