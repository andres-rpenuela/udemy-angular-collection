import {Component, signal, WritableSignal} from '@angular/core';
import {CardComponent} from '../../components/card/card.component';
import {
  AsyncPipe,
  I18nPluralPipe,
  I18nSelectPipe,
  JsonPipe,
  KeyValuePipe,
  SlicePipe,
  TitleCasePipe,
  UpperCasePipe
} from '@angular/common';
import {interval, map, tap} from 'rxjs';

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

interface ProfileI {
  name: string;
  age: number;
  address: string;
}


@Component({
  selector: 'app-uncommon-page',
  imports: [
    CardComponent, I18nSelectPipe, I18nPluralPipe, SlicePipe, JsonPipe, UpperCasePipe, KeyValuePipe, TitleCasePipe, AsyncPipe
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

  // Key Value Pipe
  readonly profile : WritableSignal<ProfileI> = signal({
    name: 'Fernando',
    age: 38,
    address: 'Ottawa, Canada'
  });


  // Async Pipe con promeas
  public someAsyncAction: Promise<string> = new Promise<string>(
    (resolve, reject) =>
    {
      // Simula una operación asíncrona (por ejemplo, un setTimeout)
      setTimeout(() => {
        const success = true;

        if (success) {
          resolve('Operación exitosa');
          console.log('Promesa terminada')
        } else {
          reject('Hubo un error');
        }
      }, 2000);
    });

  public someAsyncActionError: Promise<string> = new Promise<string>(
    (resolve, reject) =>
    {
      // Simula una operación asíncrona (por ejemplo, un setTimeout)
      setTimeout(() => {
        reject('Operación errónea');
        console.log('Promesa terminada')
      }, 2000);
    });

  public callPromise(){
    // opcion 1
    this.someAsyncAction.then(result => {
      console.log('Resultado:', result);
    })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  public async callPromise2(){
    // opcion 2
    try {
      const result = await this.someAsyncActionError;
      console.log('Resultado:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Async Pipe con observable
  public myObservalbe = interval(2000).pipe(
    map(value => value +1 ), // para que no empeice por cero, pues @if( 0 ) se considera false
    tap(value => console.log(value))
  )

}
