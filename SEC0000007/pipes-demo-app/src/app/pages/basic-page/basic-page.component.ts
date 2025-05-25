import {Component, effect, signal} from '@angular/core';
import {DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe} from '@angular/common';
import {interval} from 'rxjs';

@Component({
  selector: 'app-basic-page',
  imports: [
    LowerCasePipe,
    UpperCasePipe,
    TitleCasePipe,
    DatePipe
  ],
  templateUrl: './basic-page.component.html',
  styleUrl: './basic-page.component.css',
  standalone: true
})
export default class BasicPageComponent {
  nameLower = signal('andres');
  nameUpper = signal('ANDRES');
  fullName= signal('anDreS RuiZ PeÑueLa')

  // fechas
  currentDate = signal(new Date());
  tickingDateEffect = effect( (onCleanup) =>{
    const interval = setInterval( () =>{
      this.currentDate.set(new Date());
      console.log('tick')
    },1000);

    // cuando se destruya el efecto,
    // elimina el intervalo
    onCleanup( () => {
      interval
    });
  })
}
