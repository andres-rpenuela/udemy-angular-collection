import {afterEveryRender, afterNextRender, Component, effect, signal} from '@angular/core';
import {TitleComponent} from '../../components/title/title.component';

const log = ( ...messages:string[] ) => {
  console.log(`${ messages[0]}: %c${ messages.slice(1).join(' ')}`, 'color: green; font-weight: bold;');
}

@Component({
  selector: 'app-home-page',
  imports: [
    TitleComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  public traditionalProperty = 'This is a traditional property.';
  public signalProperty = signal('This is a signal property.');

  constructor() {
    log('constructor', 'Runs when Angular instantiates the component.');

    // si esta en la zoneless mode activo, entonces se ejcuta, pero la propiedad no se actuailza
    // se se activa el zone.js o zona de cambio, entonces se ejecuta y la propiedad se actualiza
    // la señal cambiara en ambos casos, pero la propiedad tradicional se actualizará en función de la zona activa en angular
    // setTimeout( () => {
    //   // note: This simulates an asynchronous operation, like fetching data from a server.
    //   this.traditionalProperty = 'The traditional property has been initialized.';
    //   log('constructor setTimeout', 'Runs after 2 second to simulate an asynchronous operation.');
    // },2000)
  }

  changeTraditionalProperty() {
    this.traditionalProperty = 'The traditional property has been changed.';
  }

  changeSignalProperty() {
    this.signalProperty.set('The signal property has been changed.');
  }

  basicEffect = effect(( onCleanup) => {
    log('basicEffect', 'Runs when the component is initialized or when any of its dependencies change.');

      onCleanup(() => {
        log('basicEffect cleanup', 'Runs when the component is destroyed or when the effect is re-run.');
      });
  });

  // ngOnInit	Runs once after Angular has initialized all the component's inputs.
  ngOnInit(){
    log('ngOnInit', 'Runs once after Angular has initialized all the component\'s inputs.');
  }
  // ngOnChanges	Runs every time the component's inputs have changed.
  ngOnChanges(){
    log('ngOnChanges', 'Runs every time the component\'s inputs have changed.');
  }

  // ngDoCheck	Runs every time this component is checked for changes.
  ngDoCheck(){
    log('ngDoCheck', 'Runs every time this component is checked for changes.');
  }

  // ngAfterContentInit	Runs once after the component's content has been initialized.
  ngAfterContentInit(){
    log('ngAfterContentInit', 'Runs once after the component\'s content has been initialized.');
  }

  // ngAfterContentChecked	Runs every time this component content has been checked for changes.
  ngAfterContentChecked(){
    log('ngAfterContentChecked', 'Runs every time this component content has been checked for changes.');
  }

  // ngAfterViewInit	Runs once after the component's view has been initialized.
  ngAfterViewInit(){
    log('ngAfterViewInit', 'Runs once after the component\'s view has been initialized.');
  }


  // ngAfterViewChecked	Runs every time the component's view has been checked for changes.
  ngAfterViewChecked(){
    log('ngAfterViewChecked', 'Runs every time the component\'s view has been checked for changes.');
  }

  // ngOnDestroy	Runs once when the component is about to be destroyed.
  ngOnDestroy(){
    log('ngOnDestroy', 'Runs once when the component is about to be destroyed.');
  }

  // afterNextRender	Runs after the next render cycle, useful for DOM manipulations., Angular core
  afterNextRenderEffect = afterNextRender(() => {
    log('afterNextRender', 'Runs once the next time that all components have been rendered to the DOM.');
  })

  // afterEveryRender	Runs every time all components have been rendered to the DOM, useful for DOM manipulations., Angular core
  afterEveryRenderEffect = afterEveryRender(  () => {
    log('afterEveryRender', 'Runs every time all components have been rendered to the DOM.');
  })
}
