import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {CharacterListComponent} from '../../components/dragonball/character-list/character-list.component';
import {Character} from '../../interfaces/character.interface';
import {CharacterAddComponent} from '../../components/dragonball/character-add/character-add.component';
import {CharacterService} from '../../services/character.service';

@Component({
  selector: 'app-dragonball-super-page',
  imports: [
    CharacterListComponent,
    CharacterAddComponent
  ],
  templateUrl: './dragonball-super-page.component.html',
  standalone: true,
  styleUrl: './dragonball-super-page.component.css'
})
export class DragonballSuperPageComponent implements OnInit {

  public characterService = inject(CharacterService);
// constructor(
//   public characterService: CharacterService
// ) {}

  public getCharacters(): Character[]{
    return this.characterService.getCharacter();
  }

  ngOnInit(): void {

  }

  add(character:Character) {
    this.characterService.addCharacter(character);
  }
}
