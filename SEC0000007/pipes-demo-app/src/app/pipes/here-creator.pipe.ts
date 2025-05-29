import { Pipe, PipeTransform } from '@angular/core';
import {Creator} from '../interfaces/hero.interface';

@Pipe({
  name: 'hereCreator',
  standalone: true
})
export class HereCreatorPipe implements PipeTransform {

  transform(value: Creator): string {
    return Creator[value] ? Creator[value].toString() : 'unknown';
  }

}
