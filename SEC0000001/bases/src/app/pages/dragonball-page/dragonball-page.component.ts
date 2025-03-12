import {Component, computed, signal, WritableSignal} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';


@Component({
  selector: 'app-dragonball-page',
  imports: [
    NgClass,
    NgIf
  ],
  templateUrl: './dragonball-page.component.html',
  styleUrl: './dragonball-page.component.css',
  standalone: true
})
export class DragonballPageComponent {

  name: WritableSignal<string> = signal('name');
  power: WritableSignal<number> = signal(100);

  private _characters : WritableSignal<Character[]> = signal([
    { id: 1,  name:'Goku',      power:300.19  },
    { id: 2,  name:'Crilin',    power:290  },
    { id: 3,  name:'Son Gohan', power:290.19  },
    { id: 3,  name:'Yancha', power:100  }
  ]);

  public getCharacters(): Character[]{

    return this._characters();

  }

  public powerClasses = computed(() => {
    return {
      'text-danger': true,
      'border':true
    }
  });

  created():void{
    this._characters.update(value =>{
      value.push({id:this._characters.length,name:this.name(),power:this.power()})
      return value;
    })
  }


}

interface Character{
  id: number;
  name: string;
  power: number;
}
