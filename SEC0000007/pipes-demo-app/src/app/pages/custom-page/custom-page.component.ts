import { Component, signal } from '@angular/core';
import {ToggleCasePipe} from '../../pipes/toggle-case.pipe.ts';

@Component({
  selector: 'app-custom-page',
  imports: [
    ToggleCasePipe
  ],
  templateUrl: './custom-page.component.html',
  styleUrl: './custom-page.component.css',
  standalone: true
})
export default class CustomPageComponent {

  name = signal('Andres Ruiz');
  upperCase = signal(true);

  public toggle(){
    this.upperCase.update(value => !value);
  }
}
