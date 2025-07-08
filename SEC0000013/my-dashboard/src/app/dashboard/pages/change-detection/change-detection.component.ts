import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {TitleComponent} from '@shared/title/title.component';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-change-detection',
  imports: [
    TitleComponent,
    JsonPipe
  ],
  templateUrl: './change-detection.component.html',
  styles: ``,
  //   changeDetection: ChangeDetectionStrategy.Default // Forma tradicional, se activa en todos los ciclos
  changeDetection: ChangeDetectionStrategy.OnPush  // Zonless, solo observa los cambios de algunos ciclos
})
export default class ChangeDetectionComponent {
  // Forma tradicional
  public frameworkProperty = {
    name: 'Angular',
    releaseDate: 2016
  };
  // Angular 15+
  public frameworkSignal = signal({
    name: 'Angular',
    releaseDate: 2016
  });

  constructor() {
    setTimeout(()=>{
      console.log('Hecho');
      // Se detectara el cambio si el changeDetection: ChangeDetectionStrategy.OnPush
      this.frameworkProperty =({
          ...this.frameworkProperty,
          name: 'React'
      });
      // Se detectara el cambio tanto en ChangeDetectionStrategy.OnPush como en ChangeDetectionStrategy.Default
      this.frameworkSignal.update( (value: {name:string,releaseDate:number}) =>({
          ...value,
          name: 'React'
        })
      )
    },2000)
  }


}
