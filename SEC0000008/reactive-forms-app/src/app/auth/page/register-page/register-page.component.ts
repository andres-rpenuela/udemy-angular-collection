import { Component } from '@angular/core';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-register-page',
  imports: [
    JsonPipe
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
  standalone: true
})
export class RegisterPageComponent {

}
