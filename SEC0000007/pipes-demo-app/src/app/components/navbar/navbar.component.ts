import {Component} from '@angular/core';
import {routes} from '../../app.routes';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: true
})
export class NavbarComponent {

  // extrar el titula y el path de las rutas
  // routes = routes.map( router =>({
  //   title: router.title ?? '',
  //   path: router.path ?? ''
  // }));
  routes = routes.map( ({title,path}) =>({
    title,
    path
  }))
}
