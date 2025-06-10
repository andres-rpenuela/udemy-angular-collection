import {AfterViewInit, Component, effect, ElementRef, linkedSignal, signal, viewChild} from '@angular/core';
import mapboxgl from 'mapbox-gl';
import {environment} from '../../../environments/environment';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [
    DecimalPipe
  ],
  templateUrl: './fullscreen-map-page.component.html',
  styleUrl: './fullscreen-map-page.component.css'
})
export class FullscreenMapPageComponent implements AfterViewInit {

  private divFullscreenMap   = viewChild<ElementRef>('map');

  protected map = signal<mapboxgl.Map|null>(null);
  // Signal to hold the map instance, initially null
  protected zoom = linkedSignal( () => this.map()?.getZoom() || 14 );

  private zoomEffect = effect(() => {
    if( !this.map() || !this.map()?.getZoom() ) return;


    this.map()!.setZoom(this.zoom()); // clasic
    //this.map()!.zoomTo(this.zoom()); // effect
  });

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
      zoom: this.zoom(),
      center: [-74.5, 40]
    });

    //this.map.set(map)
    this.listenZoomIn(map);
  }

  // Method to handle zoom in
  private listenZoomIn(map: mapboxgl.Map) {
    if( !map ) return;

    // Listen for zoom events and update the zoom signal
    map.on('zoom', () => {
      const newZoom = map.getZoom();
      this.zoom.set(newZoom); // Update the zoom signal with the new zoom level
    });

    // Set the map instance to the signal
    this.map.set(map)
  }
}
