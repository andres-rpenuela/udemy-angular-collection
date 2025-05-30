import { Component } from '@angular/core';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-base-page',
  imports: [
    JsonPipe
  ],
  templateUrl: './base-page.component.html',
  styleUrl: './base-page.component.css',
  standalone: true
})
export default class BasePageComponent {

}
