import {Component, inject} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormUtils} from '../../../utils/form-utils';

@Component({
  selector: 'app-switches-page',
  imports: [
    JsonPipe,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './switches-page.component.html',
  styleUrl: './switches-page.component.css',
  standalone: true
})
export default class SwitchesPageComponent {

  private formBuilder = inject(FormBuilder);


  public myForm :FormGroup = this.formBuilder.group({
    //gender:[,Validators.required], // as insert null or undefined, don't push option radioButton by default
    gender:['M',Validators.required], // as insert null or undefined, don't push option radioButton by default
    wantNotifications:[true,Validators.required],
    termAndConditions:[false,Validators.requiredTrue],
  });

  public onSubmit(){
    console.log(this.myForm);
    this.myForm.markAllAsTouched();
    throw new Error('Method not implemented.');
  }

  protected readonly FormUtils = FormUtils;
}
