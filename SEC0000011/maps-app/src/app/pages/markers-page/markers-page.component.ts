import {AfterViewInit, Component, effect, ElementRef, linkedSignal, signal, viewChild} from '@angular/core';
import mapboxgl, {LngLatLike} from 'mapbox-gl';
import {environment} from '../../../environments/environment';
import {DecimalPipe, JsonPipe} from '@angular/common';
import { v4 as uuid } from 'uuid'; // Import the uuid library to generate unique IDs

interface Marker{
  id: string;
  marker: mapboxgl.Marker;
}
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

  //protected markers = signal<mapboxgl.Marker[]>([]); // Signal to hold the markers on the map, initially an empty array
  protected markers = signal<Marker[]>([]); // Signal to hold the markers on the map, initially an empty array

  private zoomEffect = effect(() => {
    if( !this.map() || !this.map()?.getZoom() ) return;
    this.map()!.setZoom(this.zoom()); // Update the map zoom level when the zoom signal changes
  });

  private markersEffect = effect(() => {
    console.log('Markers updated:', this.markers());
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

    // Add the marker to the markers signal
    this.markers.update(markers => [{ id: uuid(), marker: marker1 },...markers]); // Add the marker to the markers signal

    // Add a dragend event listener to the marker, (info cuando el evento deja de moverse
    marker1.on('dragend', (event) => {
      console.log('Marker dragend event data:', event);
    });

    // Add a click event listener to the map
    mapView.on("click", (e) => {
      this.mapClick(e)
    });


    // Set the map instance to the signal
    this.map.set(mapView); // Set the map instance to the signal
  }

  // Method to handle map click events
  private mapClick(event: mapboxgl.MapMouseEvent) {
    if( !this.map() ) return; // Ensure the map instance is available

    console.log('Map clicked event data:', event);


    // Method to generate a random hexadecimal color for the marker
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const marker1 = new mapboxgl.Marker({
      color: color, // Use the random color generated for the marker
    })
      .setLngLat(this.coordinates()) // Use the coordinates signal to set the marker position
      .addTo(this.map()!); // Use the map signal to add the marker to the map

    this.markers.update(markers => [{ id: uuid(), marker: marker1 },...markers]); // Add the marker to the markers signal

  }

  // Method that move the center map to the marker position selected
  protected flyToMarker(lngLat: LngLatLike) {
    if( !this.map() ) return; // Ensure the map instance is available

    this.map()!.flyTo({
        center: lngLat, // Use the provided lngLat to fly to the marker position
    });
  }


  // this removed markes
  protected deleteMarker(marker: Marker){
    if( !this.map() ) return;
    const map = this.map()!;

    // this remove marker of map automatic
    marker.marker.remove();

    // update list
    const markers : Marker[] = this.markers().filter( m => m.id != marker.id ) ?? [];
    this.markers.set( markers );
  }
}
