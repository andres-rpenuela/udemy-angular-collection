import {Component, signal, WritableSignal} from '@angular/core';
import {ToggleCasePipe} from '../../pipes/toggle-case.pipe.ts';
import {heroes} from '../../data/hero.data';
import {ColorMap, Creator, Hero} from '../../interfaces/hero.interface';
import {CanFlyPipe} from '../../pipes/can-fly.pipe';
import {HeroColorPipe} from '../../pipes/hero-color.pipe';
import {NgClass, TitleCasePipe} from '@angular/common';
import {HeroTextColorPipe} from '../../pipes/hero-text-color.pipe';
import {HereCreatorPipe} from '../../pipes/here-creator.pipe';
import {HeroSortByPipe} from '../../pipes/hero-sort-by.pipe';
import {HeroOrderDataBy} from '../../interfaces/hero-order.data';

@Component({
  selector: 'app-custom-page',
  imports: [
    ToggleCasePipe,
    CanFlyPipe,
    HeroColorPipe,
    NgClass,
    TitleCasePipe,
    HeroTextColorPipe,
    HereCreatorPipe,
    HeroSortByPipe
  ],
  templateUrl: './custom-page.component.html',
  styleUrl: './custom-page.component.css',
  standalone: true
})
export default class CustomPageComponent {

  name = signal('Andres Ruiz');
  upperCase = signal(true);

  heros:WritableSignal<Hero[]> = signal<Hero[]>(heroes);

  // ocpion A: usando un enumerador
  //sortBy : WritableSignal<HeroOrderDataBy | null > = signal(null);
  // opcion B: usando keyof Interface (obtiente un array con los key)
  sortBy : WritableSignal<keyof Hero| null > = signal(null);

  public toggle(){
    this.upperCase.update(value => !value);
  }

  public getHeros(): Hero[]{
    return this.heros();
  }

  protected readonly ColorMap = ColorMap;
  protected readonly Creator = Creator;
  protected readonly HeroOrderDataBy = HeroOrderDataBy;
}
