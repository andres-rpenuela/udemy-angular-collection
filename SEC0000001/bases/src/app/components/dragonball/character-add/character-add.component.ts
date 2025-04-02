import {Component, input, InputSignal, output, OutputEmitterRef, signal, WritableSignal} from '@angular/core';
import {Character} from '../../../interfaces/character.interface';

@Component({
  selector: 'app-character-add',
  imports: [],
  standalone: true,
  templateUrl: './character-add.component.html',
  styleUrl: './character-add.component.css'
})
export class CharacterAddComponent {
  title:InputSignal<string> = input.required<string>();

  name:WritableSignal<string|null> = signal<string>('');
  power:WritableSignal<number|null> = signal<number|null>(null);

  //@Output() character = new EventEmitter<Character>();
  readonly character:OutputEmitterRef<Character> = output<Character>();

  public add(): void {
    const name = this.name();
    const power = this.power();

    console.log(name + ', ' + power);

    // Verificar si el nombre tiene longitud y el poder es un número válido
    if (name != undefined && name?.length > 0 && typeof power === 'number' && !isNaN(power)) {
      // Emitir el evento con el nuevo personaje
      this.character.emit({ name:name, power: power });
      this.clearInput();  // Limpiar los campos de entrada después de agregar
    } else {
      console.log('Por favor, ingrese un nombre válido y un poder válido.');
    }
  }

  private clearInput(){
    this.name.set(null);
    this.power.set(null);
  }
}
