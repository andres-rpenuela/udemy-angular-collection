import {Component, computed, signal, Signal, WritableSignal} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-dragonball-page',
  imports: [
    NgClass
  ],
  templateUrl: './dragonball-page.component.html',
  styleUrl: './dragonball-page.component.css',
  standalone: true
})
export class DragonballPageComponent {

    private _characters : WritableSignal<Character[]> = signal([
      { id: 1,  name:'Goku',      power:300.19  },
      { id: 2,  name:'Crilin',    power:290  },
      { id: 3,  name:'Son Gohan', power:290.19  }
    ]);

    public getCharacters(): Character[]{

      return this._characters();

    }

  public powerClasses = computed(() => {
      return {
        'text-danger': true,
        'border':true
      }
    })
}

interface Character{
  id: number;
  name: string;
  power: number;
}
