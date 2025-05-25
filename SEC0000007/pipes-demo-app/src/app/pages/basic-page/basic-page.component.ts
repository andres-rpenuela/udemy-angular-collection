import {Component, signal} from '@angular/core';
import {LowerCasePipe, TitleCasePipe, UpperCasePipe} from '@angular/common';

@Component({
  selector: 'app-basic-page',
  imports: [
    LowerCasePipe,
    UpperCasePipe,
    TitleCasePipe
  ],
  templateUrl: './basic-page.component.html',
  styleUrl: './basic-page.component.css',
  standalone: true
})
export default class BasicPageComponent {
    nameLower = signal('andres');
    nameUpper = signal('ANDRES');
    fullName= signal('anDreS RuiZ PeÑueLa')
}
