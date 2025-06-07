import { Routes } from '@angular/router';
import {HomePageComponent} from './pages/home-page/home-page.component';

export const routes: Routes = [

  {
    path: 'home',
    title: 'Home',
    component: HomePageComponent
  },
  { // lazy loading the about page
    path: 'about',
    title: 'About',
    loadComponent: () => import('./pages/about-page/about-page.component').then(m => m.AboutPageComponent)
  },
  {// lazy loading the contact page default export
    path: 'contact',
    title: 'Contact',
    loadComponent: () => import('./pages/contact-page/contact-page.component')
  },
  {
    path: '**',
    redirectTo: 'home',
  }

];
