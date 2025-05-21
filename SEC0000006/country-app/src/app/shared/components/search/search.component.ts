import {
  Component,
  effect,
  input,
  InputSignal,
  OnDestroy,
  OnInit,
  output,
  OutputEmitterRef,
  signal
} from '@angular/core';
import {debounceTime, distinctUntilChanged, Subject, Subscription, timeout} from 'rxjs';

@Component({
  selector: 'app-shared-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  standalone: true
})
export class SearchComponent implements OnInit, OnDestroy{
  public valueEmmit: OutputEmitterRef<string> = output<string>();

  public placeholderSearch : InputSignal<string> = input.required<string>();

  // private debounceSubject: Subject<string> = new Subject<string>();
  // private debounceSubscription: Subscription | undefined;
  //
  //
  // ngOnInit() {
  //
  //   this.debounceSubject.pipe(
  //     debounceTime(500),
  //     distinctUntilChanged(),
  //   ).subscribe( value => this.emitValue(value) )
  // }
  //
  // ngOnDestroy() {
  //   this.debounceSubscription?.unsubscribe();
  // }
  //
  // public onDeBounce(value : string){
  //   this.debounceSubject.next(value);
  // }
  //
  public emitValue(value : string){
    console.log(value);
    this.valueEmmit.emit(value);
  }

  valueSignal = signal<string>('');
  debounceTime = input(300);

  // se lanza el efecto cada vez que se destruya el componente, crea y cada vez que el valueSignla cambie
  // Si en ese efecto has creado un setTimeout, un interval, o algún otro recurso que debe limpiarse
  // antes de volver a ejecutar el efecto (para evitar fugas de memoria o duplicados), usás onClean
  debounceEffect = effect( (onCleanup)=>{
    // cada vez que cambia lanza el effecto
    const value = this.valueSignal(); // accede a la señal reactiva

    // espera X ms
    const timeout = setTimeout( () =>{
      this.valueEmmit.emit(value);
    }, this.debounceTime());

    // Este código se ejecuta justo antes de que el efecto se vuelva a lanzar
    // entonces cada vez que this.valueSignal()
    // 1. Se limpia el timeout anterior con clearTimeout.
    // 2. Se programa un nuevo setTimeout con el nuevo valor.
    // 3. Si el valor no cambia dentro del tiempo (debounceTime), se emite.
    onCleanup( () => {
      clearTimeout(timeout); // limpia el timeout anterior
    })
  })

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }
}
