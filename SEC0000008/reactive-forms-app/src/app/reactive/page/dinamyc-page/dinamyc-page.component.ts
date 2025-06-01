import {Component, inject} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {Form, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormUtils} from '../../../utils/form-utils';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-dinamyc-page',
  imports: [
    JsonPipe,
    ReactiveFormsModule,
    TranslatePipe
  ],
  templateUrl: './dinamyc-page.component.html',
  styleUrl: './dinamyc-page.component.css',
  standalone: true
})
export class DinamycPageComponent {

  private formBuilder = inject(FormBuilder);

  public myForm :FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)] ],
    // arreglo, a cada elemento se le puede asociar un validar, y luego al conjunto
    favoritesGames: this.formBuilder.array([
      ['Metal Gear',Validators.required],
      ['Death Stranding',Validators.required]
    ],[Validators.required, Validators.minLength(3)] )
  });

  public getFavoritesGames() : FormArray | null {
    return this.myForm.get('favoritesGames') as FormArray;
  }

  protected readonly FormUtils = FormUtils;
}
