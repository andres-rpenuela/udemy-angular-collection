import { Component } from '@angular/core';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-switches-page',
  imports: [
    JsonPipe
  ],
  templateUrl: './switches-page.component.html',
  styleUrl: './switches-page.component.css',
  standalone: true
})
export default class SwitchesPageComponent {

}
