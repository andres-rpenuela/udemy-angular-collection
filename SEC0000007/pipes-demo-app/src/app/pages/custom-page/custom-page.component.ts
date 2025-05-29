import {Component, signal, WritableSignal} from '@angular/core';
import {ToggleCasePipe} from '../../pipes/toggle-case.pipe.ts';
import {heroes} from '../../data/hero.data';
import {ColorMap, Hero} from '../../interfaces/hero.interface';
import {CanFlyPipe} from '../../pipes/can-fly.pipe';
import {HeroColorPipe} from '../../pipes/hero-color.pipe';
import {NgClass, TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-custom-page',
  imports: [
    ToggleCasePipe,
    CanFlyPipe,
    HeroColorPipe,
    NgClass,
    TitleCasePipe
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

  protected readonly ColorMap = ColorMap;
}
