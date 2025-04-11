import {Component, input, InputSignal} from '@angular/core';
import {Gif} from '../../../interfaces/gif.interface';

@Component({
  selector: 'gifs-list-item',
  imports: [],
  templateUrl: './gifs-list-item.component.html',
  styleUrl: './gifs-list-item.component.css',
  standalone: true
})
export class GifsListItemComponent {
    // imageUrl = input.required<string>();
  imageUrl:InputSignal<string> = input.required<string>();
}
