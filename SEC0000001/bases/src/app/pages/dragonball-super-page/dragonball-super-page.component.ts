import { Component } from '@angular/core';
import {CharacterListComponent} from '../../components/dragonball/character-list/character-list.component';

@Component({
  selector: 'app-dragonball-super-page',
  imports: [
    CharacterListComponent
  ],
  templateUrl: './dragonball-super-page.component.html',
  standalone: true,
  styleUrl: './dragonball-super-page.component.css'
})
export class DragonballSuperPageComponent {

}
