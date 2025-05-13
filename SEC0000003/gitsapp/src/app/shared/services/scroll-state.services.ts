import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ScrollStateService {

  private trendingScrollState : WritableSignal<number> = signal<number>(0);

  constructor() {
  }

  setTrendingScrollState(scrollTop:number):void {
    this.trendingScrollState.set(scrollTop);
  }

  getTrendingScrollState():number{
    return this.trendingScrollState();
  }
}
