import {Pipe, PipeTransform} from '@angular/core';
import {BASE_URL, NO_IMAGE} from '@products/utils/product.util';

@Pipe({
  name: 'productImage'
})
export class ProductImagePipe implements PipeTransform {
  transform(value: string | string[] ): string {

    if( typeof value === 'string'){
      return `${BASE_URL}/files/product/${ value }`;
    }

    const image = value.at(0);

    if( !image ){
      return NO_IMAGE;
    }

    return `${BASE_URL}/files/product/${ image }`;

  }

}
