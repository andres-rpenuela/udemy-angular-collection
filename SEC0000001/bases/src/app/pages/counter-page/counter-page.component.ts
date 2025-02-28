import {Component, signal, WritableSignal} from '@angular/core';

@Component({
  selector: 'app-counter-page',
  imports: [],
  templateUrl: './counter-page.component.html',
  standalone: true,
  styleUrl: './counter-page.component.css'
})
export class CounterPageComponent {
    protected counter:number = 0;
    protected counterSignal : WritableSignal<number> = signal(0)

    constructor() {
      setInterval(() => {
        console.log('Ping');
        this.counterSignal.update(value => value + 1);
      }, 2000);
    }

    public add(unit:number){
      this.counter += unit;
    }

    public subtract(unit:number){
      this.counter -= unit;
    }

    public reset(){
      this.counter = 0;
      this.counterSignal.set(0);
    }
}
