import {Component, input, InputSignal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {TruncatePipe} from '../../../pipes/truncate-pipe';

@Component({
  selector: 'product-card',
  imports: [
    RouterLink,
    TruncatePipe
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  title : InputSignal<string> = input.required<string>();
  description : InputSignal<string> = input.required<string>();
  images : InputSignal<string[]> = input<string[]>([]);
  id: InputSignal<string> = input.required<string>();
}
