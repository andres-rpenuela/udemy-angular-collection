import { Pipe, PipeTransform } from '@angular/core';
import {Color, ColorMap} from '../interfaces/hero.interface';

@Pipe({
  name: 'heroTextColor',
  standalone: true,
})
export class HeroTextColorPipe implements PipeTransform {

  private readonly CODE_HEX_DEFAULT_COLOR: string = '#9811AB';

  transform(value: Color,): string {
    return ColorMap[value] ? ColorMap[value] : this.CODE_HEX_DEFAULT_COLOR;
  }

}
