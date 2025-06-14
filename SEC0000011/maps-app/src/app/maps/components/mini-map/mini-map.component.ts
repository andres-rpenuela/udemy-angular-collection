import {AfterViewInit, Component, ElementRef, input, InputSignal, linkedSignal, signal, viewChild} from '@angular/core';
import mapboxgl from 'mapbox-gl';
import {environment} from '../../../../environments/environment';
import {single} from 'rxjs';

/**
 * tarea
 * width 100%
 * height 260px
 * mostrar mapa
 */
@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit{

  public point  = input.required<{ lng: number; lat: number }>();
  public zoom = input<number>(9);


  private readonly minMapElemRef = viewChild<ElementRef>('map');


  async ngAfterViewInit() {
    console.log('MiniMap component view initialized');

    if (!this.minMapElemRef()?.nativeElement) return;

    await new Promise( (resolve) => setTimeout(resolve,80) );

    mapboxgl.accessToken = environment.mapboxKey;

    const element = this.minMapElemRef()!.nativeElement;

    const mapView = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/streets-v9',
      projection: 'globe', // Display the map as a globe, since satellite-v9 defaults to Mercator
      zoom: this.zoom(),
      center: [this.point().lng, this.point().lat],
      interactive: false,
      pitch: 30  // display the map wit 30 degree of inclination
    });

    // Method to generate a random hexadecimal color for the marker
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const marker1 = new mapboxgl.Marker({
      color: color, // Use the random color generated for the marker
    })
      .setLngLat( [this.point().lng, this.point().lat] ) // Use the coordinates signal to set the marker position
      .addTo(mapView);

    console.log(mapView)
  }
}
