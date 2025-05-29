import {Component, effect, signal} from '@angular/core';
import {DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe} from '@angular/common';
import {interval} from 'rxjs';
import {LocaleService} from '../../services/locale.service';
import {inject} from '@angular/core';
import {LOCALE_EN, LOCALE_ES, LOCALE_FR} from '../../interfaces/locale.type';

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

  // cambio de idioma dinamicamente
  public localeService = inject(LocaleService);


  protected readonly LOCALE_FR = LOCALE_FR;
  protected readonly LOCALE_EN = LOCALE_EN;
  protected readonly LOCALE_ES = LOCALE_ES;
}
