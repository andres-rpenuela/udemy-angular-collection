import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-country-top-menu',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.css',
  standalone: true
})
export class TopMenuComponent {

}
