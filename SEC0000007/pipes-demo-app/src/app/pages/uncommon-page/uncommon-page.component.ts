import {Component, signal, WritableSignal} from '@angular/core';
import {CardComponent} from '../../components/card/card.component';
import {I18nPluralPipe, I18nSelectPipe, SlicePipe} from '@angular/common';

const client1 = {
  name: 'Andres',
  gender: 'male',
  age: 39,
  address: 'Ottawa, Canadá'
}

const client2 = {
  name: 'Melissa',
  gender: 'female',
  age: 33,
  address: 'Toronto, Canadá'
}

@Component({
  selector: 'app-uncommon-page',
  imports: [
    CardComponent, I18nSelectPipe, I18nPluralPipe, SlicePipe
  ],
  templateUrl: './uncommon-page.component.html',
  styleUrl: './uncommon-page.component.css',
  standalone: true
})
export default class UncommonPageComponent {

  readonly client = signal(client1);
  readonly clients: WritableSignal<string[]> = signal(['Andres','Melissa','Ramón','Florencia','Mila']);

  // ejemplo de uso I18nSelectPipe
  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla'
  }

  // ejemplo de uso I18nPluralPipe
  personMap = signal({
    "=0": 'no hay personas',
    "=1": 'tenemos una persona',
    "=2": 'tenemos 2 personas',
    other: 'tenemos # personas'
  });

  changeClient(){
    if( this.client() == client1 ){
      this.client.set(client2);
      return;
    }

    this.client.set(client1);
  }

  deleteClient(){
    // elimina el último
    this.clients.update( prev => prev.slice(1) );
  }
}
