import { Pipe, PipeTransform } from '@angular/core';

/**
 * {{ product.description | truncate:50 }}
 * Esto mostrará los primeros 50 caracteres y agregará … si el texto es más largo.
 *
 * {{ text | truncate:30:false }} → sin puntos suspensivos
 *
 * {{ text | truncate }} → usa el valor por defecto de 20 caracteres
 */

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit: number = 70, ellipsis: boolean = true): string {
    if (!value) return '';

    return value.length > limit
      ? value.slice(0, limit) + (ellipsis ? '…' : '')
      : value;
  }

}
