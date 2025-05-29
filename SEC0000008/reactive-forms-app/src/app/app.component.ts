import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SideMenuComponent} from './shared/component/side-menu/side-menu.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  title = 'reactive-forms-app';
}
