import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {CharacterListComponent} from '../../components/dragonball/character-list/character-list.component';
import {Character} from '../../interfaces/character.interface';
import {CharacterAddComponent} from '../../components/dragonball/character-add/character-add.component';

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

  private _characters : WritableSignal<Character[]> = signal([]);


  public getCharacters(): Character[]{
    return this._characters();
  }

  ngOnInit(): void {
    this._characters.set([
      { id: 1,  name:'Goku',      power:300.19  },
      { id: 2,  name:'Crilin',    power:290  },
      { id: 3,  name:'Son Gohan', power:290.19  },
      { id: 4,  name:'Yancha', power:100  }
    ]);
  }

  add(character:Character) {
    character.id = this.nextId();  // Asignar un id único
    // Actualizar la señal con el nuevo personaje
    this._characters.set([...this._characters(), character]);
  }

  private nextId(): number {
    // Obtener el último id sin eliminar el elemento
    const lastCharacter = [...this._characters()].at(-1);
    const lastId = lastCharacter ? lastCharacter.id : null;

    return lastId ? lastId +1 : 1;
  }
}
