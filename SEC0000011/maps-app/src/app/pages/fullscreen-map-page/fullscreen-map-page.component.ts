import {AfterViewInit, Component, effect, ElementRef, linkedSignal, signal, viewChild} from '@angular/core';
import mapboxgl, {LngLat} from 'mapbox-gl';
import {environment} from '../../../environments/environment';
import {DecimalPipe, JsonPipe} from '@angular/common';

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [
    DecimalPipe,
    JsonPipe
  ],
  templateUrl: './fullscreen-map-page.component.html',
  styleUrl: './fullscreen-map-page.component.css'
})
export class FullscreenMapPageComponent implements AfterViewInit {

  private divFullscreenMap   = viewChild<ElementRef>('map');

  protected map = signal<mapboxgl.Map|null>(null);
  // Signal to hold the map instance, initially null
  protected zoom = linkedSignal( () => this.map()?.getZoom() || 14 );

  protected coordinates = linkedSignal( () => this.map()?.getCenter() ||   { lng: -74.5, lat: 40 } );


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

    const {lng, lat} = this.coordinates(); // destructure the coordinates signal to get the initial center position
    // Create a new Mapbox map instance, for show streets
    const map = new mapboxgl.Map({
      container: element, // Use the viewChild to get the map container
      style: 'mapbox://styles/mapbox/streets-v12',
      zoom: this.zoom(),
      center: [lng,lat] //[-74.5, 40]
    });

    // Add navigation controls to the map
    this.listenZoomIn(map);
    this.listenPosition(map);
    // Set the map instance to the signal
    this.map.set(map)
  }

  // Method to handle zoom in
  private listenZoomIn(map: mapboxgl.Map) {
    if( !map ) return;

    // Listen for zoom events and update the zoom signal
    map.on('zoom', () => {
      const newZoom = map.getZoom();
      this.zoom.set(newZoom); // Update the zoom signal with the new zoom level
    });
  }

  // Method to listen for map position changes
  private listenPosition(map: mapboxgl.Map) {
    if( !map ) return;

    // Listen for move events and log the current center position
    map.on('moveend', () => {
      const center: LngLat = map.getCenter();
      console.log(`Current center: ${center.lng}, ${center.lat}`);
      this.coordinates.set(center); // Update the coordinates signal with the new center position
    });
  }
}
