import {Component, signal} from '@angular/core';
import {houses} from '../../data/house-property.data';
import {HouseProperty} from '../../interfaces/house-property.interface';
import {MiniMapComponent} from '../../maps/components/mini-map/mini-map.component';

@Component({
  selector: 'app-houses-page',
  imports: [
    MiniMapComponent
  ],
  templateUrl: './houses-page.component.html',
  styleUrl: './houses-page.component.css'
})
export class HousesPageComponent {

  houses = signal<HouseProperty[]>( [...houses] );

  constructor() {
  }
}
