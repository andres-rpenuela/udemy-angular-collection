import type {GiphyItem} from '../interfaces/ghipy.interface';
import type {Gif} from '../interfaces/gif.interface';

export class GifMapper {
  static giphyItemToGif( item: GiphyItem): Gif {
    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url
    }
  }

  static giphyItemsToGifArray( items: GiphyItem[]): Gif[] {
    return items.map( this.giphyItemToGif );
  }
}
