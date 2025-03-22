import {Component, input, InputSignal} from '@angular/core';
import {Character} from '../../../interfaces/character.interface';

@Component({
  selector: 'app-character-list',
  imports: [],
  templateUrl: './character-list.component.html',
  standalone: true,
  styleUrl: './character-list.component.css'
})
export class CharacterListComponent {

  //_characters:Character[] = [{id:1,name:'Goku',power:300.0},{id:1,name:'Son Goku',power:12.4}]
  public characters:InputSignal<Character[]>   = input.required<Character[]>();


}
