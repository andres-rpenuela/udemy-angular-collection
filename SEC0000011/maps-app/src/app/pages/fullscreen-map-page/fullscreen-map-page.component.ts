import {AfterViewInit, Component, ElementRef, viewChild} from '@angular/core';
import mapboxgl from 'mapbox-gl';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [],
  templateUrl: './fullscreen-map-page.component.html',
  styleUrl: './fullscreen-map-page.component.css'
})
export class FullscreenMapPageComponent implements AfterViewInit {

  private divFullscreenMap   = viewChild<ElementRef>('map');

  // cuando se inicializa el componente y la vista está lista, se ejecuta este metodo
  // lo hazmoes asincrono para que se pueda esperar a que el DOM esté completamente cargado
  async ngAfterViewInit() {

    if( !this.divFullscreenMap() || !this.divFullscreenMap()?.nativeElement ) return;
    // Ensure the map container is ready before initializing the map
    const element = this.divFullscreenMap()!.nativeElement;

    // espera X ms, antes de cargar el mapa, por esto se hace asincrono el metodo
    // Delay to ensure the map container is ready, before call the resolve
    await new Promise((resolve) => setTimeout(resolve ,50)  );


    // Initialize Mapbox GL JS with the access token and map options, important, use the `import  mapboxgl  from 'mapbox-gl';`
    mapboxgl.accessToken = environment.mapboxKey; // Ensure you have your Mapbox access token set in the environment

    // Create a new Mapbox map instance, for show globe
    // const map = new mapboxgl.Map({
    //   container: element, // Use the viewChild to get the map container
    //   style: 'mapbox://styles/mapbox/streets-v9',
    //   projection: 'globe', // Display the map as a globe, since satellite-v9 defaults to Mercator
    //   zoom: 1,
    //   center: [30, 15]
    // });

    // Create a new Mapbox map instance, for show streets
    const map = new mapboxgl.Map({
      container: element, // Use the viewChild to get the map container
      style: 'mapbox://styles/mapbox/streets-v12',
      zoom: 9,
      center: [-74.5, 40]
    });

  }
}
