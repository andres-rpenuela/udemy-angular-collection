import {Component, signal} from '@angular/core';
import {CardComponent} from '../../components/card/card.component';
import {I18nSelectPipe} from '@angular/common';

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
    CardComponent, I18nSelectPipe
  ],
  templateUrl: './uncommon-page.component.html',
  styleUrl: './uncommon-page.component.css',
  standalone: true
})
export default class UncommonPageComponent {

  readonly client = signal(client1);

  // ejemplo de uso I18nSelectPipe
  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla'
  }

  changeClient(){
    if( this.client() == client1 ){
      this.client.set(client2);
      return;
    }

    this.client.set(client1);
  }
}
