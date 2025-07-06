import { Component } from '@angular/core';
import {HeavyLoadersSlowComponent} from '@shared/heavy-loaders/heavy-loaders-slow.component';

@Component({
  selector: 'app-defer-views',
  imports: [
    HeavyLoadersSlowComponent
  ],
  templateUrl: './defer-views.component.html',
  styles: ``
})
export default class DeferViewsComponent {

}
