import { Component } from '@angular/core';

@Component({
  selector: 'app-counter-page',
  imports: [],
  templateUrl: './counter-page.component.html',
  standalone: true,
  styleUrl: './counter-page.component.css'
})
export class CounterPageComponent {
    protected counter:number = 0;

    public add(unit:number){
      this.counter += unit;
    }

    public subtract(unit:number){
      this.counter -= unit;
    }

    public reset(){
      this.counter = 0;
    }
}
