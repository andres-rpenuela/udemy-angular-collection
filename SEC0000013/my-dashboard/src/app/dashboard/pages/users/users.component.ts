import {Component, computed, inject} from '@angular/core';
import {UserService} from '@services/user.service';
import {TitleComponent} from '@shared/title/title.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [
    TitleComponent,
    RouterLink
  ],
  templateUrl: './users.component.html',
  styles: ``
})
export default class UsersComponent {

  public userService = inject(UserService);


  constructor() {
    console.log( this.userService.users );
  }

}
