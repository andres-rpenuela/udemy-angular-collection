import {Component, effect, input, InputSignal, linkedSignal, output, signal, WritableSignal} from '@angular/core';
import {Region} from '@interface/country/region.type';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-region-menu-top',
  imports: [
    NgClass
  ],
  templateUrl: './menu-top.component.html',
  styleUrl: './menu-top.component.css',
  standalone: true
})
export class MenuTopComponent {

  valueInit : InputSignal<Region | null> = input<Region|null>(null);

  public regions:Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  regionOut = output<Region>();
  //selectedRegion: Region | null = null;
  selectedRegion = signal<Region | null>(null);

  constructor() {
    effect(() => {
      if( this.valueInit() ) {
        console.log("enviar region al parent")
        this.onSelectRegion( this.valueInit() ! )
      }
    });
  }

  onSelectRegion(region: Region) {
    console.log( region );
    if(this.selectedRegion() != region) {
      console.log("enviar region al parent")
      this.selectedRegion.set( region );
      this.regionOut.emit(region);
    }
  }
}
