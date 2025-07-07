import { Component } from '@angular/core';
import {TitleComponent} from '@shared/title/title.component';

@Component({
  selector: 'app-view-transition',
  imports: [
    TitleComponent
  ],
  template: `
    <shared-title [title]="'View Trnasition 2'"></shared-title>


    <section class="flex justify-end">
      <img srcset="https://picsum.photos/id/237/200/300"
           alt="Picsum"
           width="200"
           height="300"
           style="view-transition-name:hero2"
      />

      <div class="bg-blue-500 w-56 h-56"
           style="view-transition-name(hero2)"></div>
    </section>
  `,
  styles: ``
})
export default class ViewTransition2Component {

}
