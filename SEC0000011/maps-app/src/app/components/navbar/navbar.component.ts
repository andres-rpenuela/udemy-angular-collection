import {Component, inject} from '@angular/core';
import {routes} from '../../app.routes';
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from '@angular/router';
import {filter, map, tap} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    AsyncPipe,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  protected title = 'Maps App';
  protected subtitle = 'Explore the world with maps';

  // Convert the routes to the format expected by the NavbarComponent
  protected routes = routes
    .filter(router => router.path !== '**') // Exclude wildcard routes
    .map( route => (
    {
      path: route.path,
      title: `${route.title ?? 'unknown'}`,
    })
  );

  // Inject the Router service to access routing events
  router = inject(Router);

  // observable for the current page title, using NavigationEnd events
  pageTitle$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    tap( event => {console.log('Router event:', event); }),
    map( event => event.url),
    map( url => {
      console.log('Current URL in NavigationEnd:',url);
      return routes.find(route => `/${route.path}` === url )?.title || 'Unknown Page: Maps App';
    } )
  );

  constructor() {
    // Initialization logic can go here if needed
  }
}
