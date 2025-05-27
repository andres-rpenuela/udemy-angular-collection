import { Component } from '@angular/core';
import {CardComponent} from '../../components/card/card.component';

@Component({
  selector: 'app-uncommon-page',
  imports: [
    CardComponent
  ],
  templateUrl: './uncommon-page.component.html',
  styleUrl: './uncommon-page.component.css',
  standalone: true
})
export default class UncommonPageComponent {

}
