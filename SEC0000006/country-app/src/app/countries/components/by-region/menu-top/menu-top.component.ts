import {Component, output} from '@angular/core';
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

  public regions:Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  regionOut = output<Region>();
  selectedRegion: Region | null = null;


  onSelectRegion(region: Region) {

    if(this.selectedRegion != region) {
      console.log("enviar region al parent")
      this.selectedRegion = region;
      this.regionOut.emit(region);
    }
  }
}
