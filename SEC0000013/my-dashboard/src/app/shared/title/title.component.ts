import {booleanAttribute, Component, Input, input} from '@angular/core';

@Component({
  selector: 'shared-title',
  imports: [],
  templateUrl: './title.component.html',
  styles: ``
})
export class TitleComponent {
  // @Input({required: true }) title!:string;
  public title = input.required<string>();

  // si esta presente lo pone a treu
  @Input({transform: booleanAttribute }) withShadow:boolean = false;
  /**
   *  Es la forma recomendada para manejar boolean inputs en Angular moderno (16+).
   *  - Opcion A: <my-card withShadow></my-card>        <!-- true -->
   *  - Opcion B: <my-card withShadow="true"></my-card> <!-- true -->
   *  - Opcion C: <my-card withShadow="false"></my-card><!-- false -->
   */
}
