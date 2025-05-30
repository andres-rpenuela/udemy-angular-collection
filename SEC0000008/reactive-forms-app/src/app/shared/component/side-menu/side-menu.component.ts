import {Component} from '@angular/core';
import {MenuItem} from '../../interfaces/menu-item.interface';
import {reactiveItems} from '../../data/routes.data';
import {RouterLink, RouterLinkActive} from '@angular/router';


@Component({
  selector: 'app-side-menu',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
  standalone: true
})
export class SideMenuComponent {
  // se genera el menu de items de reactive
  reactiveMenuItems: MenuItem[] = reactiveItems
    .filter( item => !item.path?.includes('**'))
    .map(item => ({
        title:`${item.title}`,
        route:`reactive/${item.path}`
      })
    );
}
