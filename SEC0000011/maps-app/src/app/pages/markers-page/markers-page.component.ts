import {AfterViewInit, Component, effect, ElementRef, linkedSignal, signal, viewChild} from '@angular/core';
import mapboxgl from 'mapbox-gl';
import {environment} from '../../../environments/environment';
import {DecimalPipe, JsonPipe} from '@angular/common';


@Component({
  selector: 'app-markers-page',
  imports: [
    DecimalPipe,
    JsonPipe
  ],
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent implements AfterViewInit {

  protected readonly divMapMarker = viewChild<ElementRef>('map');
  protected map = signal<mapboxgl.Map | null >(null ); // Signal to hold the map instance, initially null
  protected zoom = linkedSignal( () => this.map()?.getZoom() || 9) // Signal to hold the zoom level, initially 9
  protected coordinates = linkedSignal( () => this.map()?.getCenter() || { lng: -4.64, lat: 37.19 } ); // Signal to hold the map center coordinates


  private zoomEffect = effect(() => {
    if( !this.map() || !this.map()?.getZoom() ) return;
    this.map()!.setZoom(this.zoom()); // Update the map zoom level when the zoom signal changes
  });

  ngAfterViewInit(): void {
    // This method is called after the view has been initialized
    console.log('MarkersPageComponent view initialized');
    if( !this.divMapMarker || !this.divMapMarker()?.nativeElement ) return;

    mapboxgl.accessToken = environment.mapboxKey; // Ensure you have your Mapbox access token set in the environment

    const mapView = new mapboxgl.Map({
      container: this.divMapMarker()?.nativeElement, // Use the viewChild to get the map container',
      style: 'mapbox://styles/mapbox/streets-v9',
      projection: 'globe', // Display the map as a globe, since satellite-v9 defaults to Mercator
      zoom: this.zoom(), // Use the zoom signal to set the initial zoom level
      center: this.coordinates() // Use the coordinates signal to set the initial center position
    });

    // Add navigation controls to the map
    mapView.on('mousemove', (e) => {
      //console.log('Mouse move event data:', e);

      // Update the coordinates signal with the current mouse position
      this.coordinates.set({ lng: e.lngLat.lng, lat: e.lngLat.lat });
      //console.log('Mouse moved:', this.coordinates());
    });

    // Add a click event listener to the map
    mapView.on("click", (e) => {
      console.log('Map clicked event data:', e);
      const marker1 = new mapboxgl.Marker()
        .setLngLat(this.coordinates()) // Use the coordinates signal to set the marker position
        .addTo(mapView);
    });

    // Add a marker to the map at the initial coordinates
    // https://docs.mapbox.com/mapbox-gl-js/example/add-a-marker/
    const marker1 = new mapboxgl.Marker(
      // Use the coordinates signal to set the marker position
      {
        color: 'red',
        draggable: false,
      } // Example options for the marker
    )
      .setLngLat(this.coordinates()) // Use the coordinates signal to set the marker position
      .addTo(mapView);

    // Add a dragend event listener to the marker, (info cuando el evento deja de moverse
    marker1.on('dragend', (event) => {
      console.log('Marker dragend event data:', event);
    })
    // Set the map instance to the signal
    this.map.set(mapView); // Set the map instance to the signal
  }

}
