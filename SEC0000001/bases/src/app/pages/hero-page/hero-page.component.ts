import {Component, computed, Signal, signal, WritableSignal} from '@angular/core';
import {UpperCasePipe} from '@angular/common';

@Component({
  selector: 'app-hero-page',
  imports: [
    UpperCasePipe
  ],
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.css',
  standalone: true
})
export class HeroPageComponent {
  protected name: WritableSignal<string> = signal('Ironman');
  protected age: WritableSignal<number> = signal(45);

  constructor() {}


  protected getHeroDescription():string {
    return `${ this.name() } - ${ this.age() }`;
  }

  // señal comptuada
  protected heroDescription : Signal<string> = computed( () => {
    return this.getHeroDescription();
  });

  protected nameCapitalization : Signal<string> = computed( () => {
    return this.name().toUpperCase();
  });

  protected changeHero():void{
    this.name.set('Spiderman');
    this.age.set(22);
  }

  protected resetForm():void{
    this.name.set('Ironman');
    this.age.set(45);
  }

  protected chageAge():void{
    this.age.set(60);
  }
}
