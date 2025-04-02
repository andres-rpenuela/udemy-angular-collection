import {Injectable, signal, WritableSignal} from '@angular/core';
import {Character} from '../interfaces/character.interface';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private _characters : WritableSignal<Character[]> = signal([]);

  constructor() {
    this._characters.set([
      { id: 1,  name:'Goku',      power:300.19  },
      { id: 2,  name:'Crilin',    power:290  },
      { id: 3,  name:'Son Gohan', power:290.19  },
      { id: 4,  name:'Yancha', power:100  }
    ]);
  }

  public getCharacter():Character[]{
    return this._characters();
  }

  public addCharacter(character:Character):void{
    character.id = this.nextId();
    this._characters.update(list => [...list, character]);
  }

  private nextId(): number {
    // Obtener el último id sin eliminar el elemento
    const lastCharacter = [...this._characters()].at(-1);
    const lastId = lastCharacter ? lastCharacter.id : null;

    return lastId ? lastId +1 : 1;
  }
}
