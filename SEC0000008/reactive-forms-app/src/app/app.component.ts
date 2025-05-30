import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SideMenuComponent} from './shared/component/side-menu/side-menu.component';
import {TranslatePipe} from '@ngx-translate/core';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideMenuComponent, TranslatePipe, DecimalPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  title = 'reactive-forms-app';
}
