import {Component, computed, inject, signal} from '@angular/core';
import {TitleComponent} from '@shared/title/title.component';
import {ActivatedRoute, Params, RouterLink} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {UserService} from '@services/user.service';
import {switchMap} from 'rxjs';

@Component({
  selector: 'app-user',
  imports: [
    TitleComponent,
    RouterLink
  ],
  templateUrl: './user.component.html',
  styles: ``
})
export default class UserComponent {

  private activatedRouter = inject(ActivatedRoute);

  private userService = inject(UserService);
  //public user = signal<User | undefined>(undefined);
  public user = toSignal(
    this.activatedRouter.params.pipe(
      //switchMap( (param :Params) => this.userService.getUserById( param['id'] ))
      switchMap( ({id}) => this.userService.getUserById( id ))
    )
  );

  public fullName = computed(() => this.user() ? 'User: ' + this.user()?.first_name + ' ' + this.user()?.last_name : 'User')
}
