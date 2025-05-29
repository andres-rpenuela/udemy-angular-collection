import { Pipe, PipeTransform } from '@angular/core';
import {Color} from '../interfaces/hero.interface';

@Pipe({
  name: 'heroColor',
  standalone: true
})
export class HeroColorPipe implements PipeTransform {

  transform(value: Color ): string {

    return Color[value] ? Color[value].toString() : 'undefined' ;
  }

}
