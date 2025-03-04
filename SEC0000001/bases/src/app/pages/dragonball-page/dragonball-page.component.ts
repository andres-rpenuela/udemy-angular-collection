import {Component} from '@angular/core';

@Component({
  selector: 'app-dragonball-page',
  imports: [],
  templateUrl: './dragonball-page.component.html',
  styleUrl: './dragonball-page.component.css',
  standalone: true
})
export class DragonballPageComponent {
    private _persons : person[] = [
      {
        id: 1,
        name:'Goku',
        power:300.19
      },
      {
        id: 2,
        name:'Crilin',
        power:290.19
      },
      {
        id: 3,
        name:'Son Gohan',
        power:290.19
      }
    ];

    public getPerson(): person[]{
      return this._persons;
    }
}

interface person{
  id: number;
  name: string;
  power: number;
}
