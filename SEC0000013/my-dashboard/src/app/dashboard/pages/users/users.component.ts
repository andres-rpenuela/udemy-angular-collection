import {Component, inject} from '@angular/core';
import {UserService} from '@services/user.service';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styles: ``
})
export default class UsersComponent {

  public userService = inject(UserService);


}
