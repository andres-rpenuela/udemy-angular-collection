import { Component } from '@angular/core';
import {FrontNavbarItemsComponent} from './front-navbar-items/front-navbar-items.component';
import {StoreRoute} from '../../interfaces/store-route.interface';
import {storeRoutesData} from '../../data/store-route.data';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'front-navbar',
  imports: [
    FrontNavbarItemsComponent,
    RouterLink
  ],
  templateUrl: './front-navbar.component.html',
  styleUrl: './front-navbar.component.css'
})
export class FrontNavbarComponent {

  public readonly storeRoutes: Record<string, StoreRoute[] > = storeRoutesData;
}
