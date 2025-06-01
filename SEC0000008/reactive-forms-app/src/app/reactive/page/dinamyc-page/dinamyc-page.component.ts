import {Component, inject} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
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

  // control aislado
  public newFavorite = new FormControl('', Validators.required);
  //public newFavorite = this.formBuilder.control([]);

  // refactor (crea un propiedad automacticamente 'private _favoirteGmaes"
  get favoritesGames() : FormArray | null {
    return this.myForm.get('favoritesGames') as FormArray;
  }

  protected readonly FormUtils = FormUtils;

  public onAddToFavorites(){
    if( this.newFavorite.invalid) return;

    const newGame = this.newFavorite.value;

    // OPCION A. añadir el control
    this.favoritesGames?.push(this.formBuilder.control( newGame, Validators.required) )

    this.newFavorite.reset('');
  }

  public onDeleteFavorite(index :number){
    this.favoritesGames?.removeAt(index);
    this.favoritesGames?.markAllAsTouched();
  }

  public onSubmit(){
    this.myForm.markAllAsTouched();
    if(this.myForm.invalid) return;

    console.log(this.myForm.value);
  }
}
