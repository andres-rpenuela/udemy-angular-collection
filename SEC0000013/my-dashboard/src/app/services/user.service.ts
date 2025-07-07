import {Injectable, signal} from '@angular/core';
import {User} from '@interfaces/req-reponse';

interface State{
  users: User[];
  loading:boolean;
}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Link de info:
  // https://reqres.in/
  // https://app.quicktype.io/
  // Nota: poner `#` hace uqe sea privado y evita que se ejeucte si hay error.
  #state = signal<State>({
    loading: true,
    users:[]
  })

  constructor() {
    console.log('Cargando data ...');
  }
}
