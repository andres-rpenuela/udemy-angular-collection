import {Component, signal} from '@angular/core';
import {NgClass} from '@angular/common';
import {TitleComponent} from '@shared/title/title.component';

type Grade = 'A' | 'B' | 'F';

@Component({
  selector: 'app-control-flow',
  imports: [
    NgClass,
    TitleComponent
  ],
  templateUrl: './control-flow.component.html',
  styleUrl: './control-flow.component.css'
})
export default class ControlFlowComponent {

  public showContent = signal(false);
  public grade = signal<Grade>('A');
  public frameworks = signal(['Angular','Vue','Svelte','Qiwk','Go']);
  public frameworks2 = signal<string[]>([]);


  public toggleContent(){
    this.showContent.update( value => !value );
  }

  public addGrade(value: string) {
      this.grade.set( value as Grade );
  }

  public addFramework2(framework: string)
  {
    this.frameworks2.update(value => [...value,framework]);
  }
}
