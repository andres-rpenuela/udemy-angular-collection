import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, delay, map, Observable, of, take} from 'rxjs';

// como son interfaces, poner `type`para que ts no hag ningun tipo de transpilaicon, trascripción
import type {User, UserResponse, UsersResponse} from '@interfaces/req-reponse';


interface State{
  users: User[];
  loading:boolean;
}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  public http = inject(HttpClient);

  // Link de info:
  // https://reqres.in/
  // https://app.quicktype.io/
  // Nota: poner `#` hace uqe sea privado y evita que se ejeucte si hay error.
  #state = signal<State>({
    loading: true,
    users:[]
  })

  // señal computada, de lectura que cmabia cuando cmabioa la señal privada
  public users = computed( () => this.#state().users );

  constructor() {
    console.log('Cargando data ...');

    // https://reqres.in/api/users?page=2
    // curl --location 'https://reqres.in/api/users?page=2' --header 'x-api-key: reqres-free-v1'
    const params = new HttpParams()
      .set('page', 2);

    const headers = new HttpHeaders({
      'x-api-key': 'reqres-free-v1'
    });

    //this.http.get<UserResponse>('https://reqres.in/api/users')
    //this.http.get<UserResponse>('https://reqres.in/api/users',{params})
    this.http.get<UsersResponse>('https://reqres.in/api/users',{ headers, params })
      .pipe(
        delay(1500),
        take(1), // emit only first observable
        catchError(err => {
            console.error('Request error: '+err);
            throw Error(err);
          }
        )
      )
      .subscribe( res => {
        console.log({res});
        this.#state.set({
          loading : false,
          users : res.data
        });
      })
  }

  public getUserById( id:number) : Observable<User>{
    const headers = new HttpHeaders({
      'x-api-key': 'reqres-free-v1'
    });
    return this.http.get<UserResponse>('https://reqres.in/api/users/'+id, { headers })
      .pipe(
        delay(1500),
        take(1),
        map( resp => resp.data ),
        catchError(err => {
          console.log('Error get user by id: '+err);
          return of();
        })
      );
  }
}
