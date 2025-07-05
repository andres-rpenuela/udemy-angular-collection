import {Pipe, PipeTransform} from '@angular/core';
import {BASE_URL, NO_IMAGE} from '@products/utils/product.util';

@Pipe({
  name: 'productImage'
})
export class ProductImagePipe implements PipeTransform {
  transform(value: string | string[] | null ): string {
    const image = Array.isArray(value)
      ? value[0]
      : value;

    if (!image) {
      return NO_IMAGE;
    }

    // Nota: Las imagenes blob son las cargads por URL.createObjectURL(file) y no estan en el back
    return image.startsWith("blob:") ? image : `${BASE_URL}/files/product/${image}`;
  }

}
