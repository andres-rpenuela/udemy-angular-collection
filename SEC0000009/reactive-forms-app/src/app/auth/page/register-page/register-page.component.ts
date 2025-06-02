import { Component } from '@angular/core';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-register-page',
  imports: [
    JsonPipe
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
  standalone: true
})
export class RegisterPageComponent {
  //! Tarea: Crear un formulario y enlanzarlo con el html
  /**
   * name -> obligatorio
   * email -> obligatorio y email
   * username -> obligatorio y min 6 caracteres
   * password -> obligatorio y min 6 caracteres
   * password2 -> obligatorio (confirmPassword, sería un mejor nombre)
   */
}
