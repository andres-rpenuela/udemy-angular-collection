import {Component, OnDestroy, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-country-by-capital',
  imports: [],
  templateUrl: './by-capital.component.html',
  styleUrl: './by-capital.component.css',
  standalone: true
})
export class ByCapitalComponent implements OnInit, OnDestroy{
  private searchSubject: Subject<string> = new Subject<string>();
  private searchSub : Subscription | undefined;

  onDeBounce(value : string){
    this.searchSubject.next(value);

  }
  onSearch(value:string){
    console.log(value);
  }

  ngOnInit() {
    this.searchSub = this.searchSubject
      .pipe(
        debounceTime(500), // garantiza que sólo el último valor emitido
        distinctUntilChanged() //  evita que se emita el mismo valor dos veces seguidas
      )
      .subscribe(valueToSend => {
        // Aquí va tu lógica para buscar o filtrar
        this.onSearch(valueToSend)
      });
  }

  ngOnDestroy(): void {
    this.searchSub?.unsubscribe(); // evita fugas de memoria
  }
}
