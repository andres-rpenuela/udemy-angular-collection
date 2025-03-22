import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {CharacterListComponent} from '../../components/dragonball/character-list/character-list.component';
import {Character} from '../../interfaces/character.interface';

@Component({
  selector: 'app-dragonball-super-page',
  imports: [
    CharacterListComponent
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
      { id: 3,  name:'Yancha', power:100  }
    ]);
  }
}
