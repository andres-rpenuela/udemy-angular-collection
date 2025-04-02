import {Component, Input, input, InputSignal} from '@angular/core';
import {Character} from '../../../interfaces/character.interface';

@Component({
  selector: 'app-character-list',
  imports: [],
  templateUrl: './character-list.component.html',
  standalone: true,
  styleUrl: './character-list.component.css'
})
export class CharacterListComponent {

  @Input("listTitle") public listTitle:string = '';
  //public listTitle:InputSignal<string>  = input.required<string>();

  //_characters:Character[] = [{id:1,name:'Goku',power:300.0},{id:1,name:'Son Goku',power:12.4}]
  // @Input("characters") public characters:Character[] = [];
  public characters:InputSignal<Character[]>   = input.required<Character[]>();
}
