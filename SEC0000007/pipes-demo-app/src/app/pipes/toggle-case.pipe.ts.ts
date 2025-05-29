import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toggleCase', // selector para usar el Pipe
  standalone: true
})
export class ToggleCasePipe implements PipeTransform {

  // este metodo se llama cada vez que camibe la data
  // 'andres' | toggleCase
  // value = 'andres'
  // args => son las opciones del pipe (opcional), puede ser::: ...args: any[] o arg1:type, arg2:type, ...
  // upper:boolean > argumento requerido
  // upper:boolean = true  > argumento opcional,
  transform(value: any, upper:boolean = true): any {
    console.log( value, upper)
    return upper ? value.toUpperCase() : value.toLowerCase();
  }
}
