import { Component, OnInit, effect, signal } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';

@Component({
  selector: 'app-country',
  standalone: true,
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  // imports: [RouterModule]  // ✅ requerdio cuando  usas un componente standalone y accedes a servicios con Inject(), ya Angular no puede garantizar que el módulo (como RouterModule)
})
export class CountryComponent implements OnInit {
  readonly countrySignal = signal<string>('');

  constructor(private route: ActivatedRoute) {} // ✅ inyección clásica, con Incject no carga correctamente

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const country = params.get('country') ?? '';
      this.countrySignal.set(country);
    });

    effect(() => {
      console.log(`Param received: ${this.countrySignal()}`);
    });
  }
}
