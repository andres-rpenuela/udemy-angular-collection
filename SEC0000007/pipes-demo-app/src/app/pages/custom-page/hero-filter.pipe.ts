import { Pipe, PipeTransform } from '@angular/core';
import {Hero} from '../../interfaces/hero.interface';

@Pipe({
  name: 'heroFilter',
  standalone: true
})
export class HeroFilterPipe implements PipeTransform {

  transform(value: Hero[], search: string = ''): Hero[] {
    if( search.length == 0) return value;

    search = search.toLowerCase();
    return value.filter( hero => hero.name.toLowerCase().includes( search ));
  }

}
