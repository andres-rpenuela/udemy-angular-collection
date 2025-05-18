import {Component, input, InputSignal, OnDestroy, OnInit, output, OutputEmitterRef} from '@angular/core';
import {debounceTime, distinctUntilChanged, Subject, Subscription} from 'rxjs';

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

  private debounceSubject: Subject<string> = new Subject<string>();
  private debounceSubscription: Subscription | undefined;


  ngOnInit() {

    this.debounceSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe( value => this.emitValue(value) )
  }

  ngOnDestroy() {
    this.debounceSubscription?.unsubscribe();
  }

  public onDeBounce(value : string){
    this.debounceSubject.next(value);
  }

  public emitValue(value : string){
    console.log(value);
    this.valueEmmit.emit(value);
  }

}
