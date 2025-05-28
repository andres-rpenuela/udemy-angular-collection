import {Component, signal, WritableSignal} from '@angular/core';
import {ToggleCasePipe} from '../../pipes/toggle-case.pipe.ts';
import {heroes} from '../../data/hero.data';
import {Hero} from '../../interfaces/hero.interface';

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

  heros:WritableSignal<Hero[]> = signal<Hero[]>(heroes);

  public toggle(){
    this.upperCase.update(value => !value);
  }

  public getHeros(): Hero[]{
    return this.heros();
  }
}
