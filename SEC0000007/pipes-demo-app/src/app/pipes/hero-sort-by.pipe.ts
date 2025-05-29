import {Pipe, PipeTransform} from '@angular/core';
import {Hero} from '../interfaces/hero.interface';
import {HeroOrderDataBy} from '../interfaces/hero-order.data';

@Pipe({
  name: 'heroSortBy',
  standalone: true
})
export class HeroSortByPipe implements PipeTransform {

  // transform(value: Hero[], sortBy: HeroOrderDataBy | null): Hero[] {
  //     console.log('hero sort by> incide= ', sortBy, ', valor= ', sortBy?HeroOrderDataBy[sortBy]:'undefined');
  //
  //   if(  sortBy == null || !HeroOrderDataBy[sortBy] ){ return value; }
  //   return [];
  // }

  transform(value: Hero[], sortBy: keyof Hero| null): Hero[] {
    console.log('hero sort by> incide= ', sortBy, ', valor= ', sortBy? sortBy :'undefined');

    if(  sortBy == null ){ return value; }

    switch (sortBy) {
      case 'name': // stirng
        return value.sort((a, b) => a.name.localeCompare(b.name));
      case "canFly": // booelan
        //  los que pueden volar (canFly === true) estén al final del array.
        // si a.canFlay = true = 1, si a.canFlay = false = -1
        // 1 - 1 = 0 > No cambia orden,
        // -1 - (-1)  = 0 no cambia orden,
        // 1 - (-1) = 2 > 0 b va antes que a,
        // -1 - (-1) = -2 < 0 a va antes que b,
        return value.sort((a, b) => (a.canFly ? 1 : -1) - (b.canFly ? 1 : -1) );
      case 'color' : // numero
        // < 0, b va antes que a
        // > 0, a va antes que b
        // = 0, no cambia
        return value.sort( (a,b) => a.color - b.color);
      case 'creator': // numero
        // < 0, b va antes que a
        // > 0, a va antes que b
        // = 0, no cambia
        return value.sort( (a,b) => a.creator - b.creator);
      default:
        return value
    }
  }

}
