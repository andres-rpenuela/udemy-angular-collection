import { Component } from '@angular/core';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-dinamyc-page',
  imports: [
    JsonPipe
  ],
  templateUrl: './dinamyc-page.component.html',
  styleUrl: './dinamyc-page.component.css',
  standalone: true
})
export class DinamycPageComponent {

}
