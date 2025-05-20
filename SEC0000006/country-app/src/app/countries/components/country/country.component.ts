import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {rxResource} from '@angular/core/rxjs-interop';
import {of} from 'rxjs';
import {CountryService} from '../../services/country.service';
import {NotFoundComponent} from '../../../shared/components/not-found/not-found.component';
import {JsonPipe} from '@angular/common';
import {CountryInformationComponent} from './country-information/country-information.component';

@Component({
  selector: 'app-country',
  standalone: true,
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  imports: [
    NotFoundComponent,
    JsonPipe,
    CountryInformationComponent
  ],
  // imports: [RouterModule]  // ✅ requerdio cuando  usas un componente standalone y accedes a servicios con Inject(), ya Angular no puede garantizar que el módulo (como RouterModule)
})
export class CountryComponent implements OnInit {
  // opcion a, de obtener el parametro de la query (esta variable, no es una señeal)
  readonly countryCode = inject(ActivatedRoute).snapshot.params['country'];
  // opcion b. son señales ActiveRoute + obserbables
  readonly countrySignal = signal<string>('');
  private readonly countryService = inject(CountryService);

  constructor(private route: ActivatedRoute) {} // ✅ inyección clásica, con Incject no carga correctamente


  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const country = params.get('country') ?? '';
      this.countrySignal.set(country);
    });
  }

  public countryResource = rxResource({
    request: () => ( { query : this.countrySignal() } ),
    loader: ({request}) => {
      if( !this.countrySignal()?.trim()) return of(null); // si no hay valor, se devuelve un valor vacio

      return  this.countryService.searchCountryByAlphaCode( request.query );
    }
  });

  public getErrorCountryResource() : string{
    return <string> this.countryResource.error();
  }
}
