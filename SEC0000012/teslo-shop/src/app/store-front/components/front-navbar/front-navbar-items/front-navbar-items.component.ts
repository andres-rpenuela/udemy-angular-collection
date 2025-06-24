// Importaciones necesarias desde Angular
import { Component, inject, input, InputSignal, linkedSignal, WritableSignal } from '@angular/core';
import { StoreRoute } from '../../../interfaces/store-route.interface'; // Interfaz personalizada para las rutas
import { IsActiveMatchOptions, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

// Decorador del componente Angular
@Component({
  selector: 'front-navbar-items', // Nombre del selector que se usará en la plantilla
  imports: [ // Declaración de dependencias usadas en el template
    RouterLink,        // Para navegar con [routerLink]
    TitleCasePipe,     // Para transformar títulos (Ej: "hombres" → "Hombres")
    RouterLinkActive   // Para aplicar clases a enlaces activos
  ],
  templateUrl: './front-navbar-items.component.html',  // Ruta al archivo de plantilla HTML
  styleUrl: './front-navbar-items.component.css'       // Ruta al archivo CSS
})
export class FrontNavbarItemsComponent {

  // Entrada booleana reactiva que indica si el botón está en modo responsive
  public isButtonResponsive: InputSignal<boolean> = input(false);

  // Entrada requerida: un objeto con grupos de rutas (categorías de navegación)
  public routesNav: InputSignal<Record<string, StoreRoute[]>> = input.required();

  // Signal que obtiene las claves del objeto de rutas (por ejemplo: ['gender', 'categories', ...])
  public routesNavKeys: WritableSignal<string[]> = linkedSignal(() =>
    Object.keys(this.routesNav()) ?? []  // Devuelve un arreglo de claves de navegación
  );

  // Inyección del Router para manejar rutas activas
  private router = inject(Router);

  /**
   * Verifica si alguna de las rutas dentro de un grupo está activa.
   * Esto sirve para marcar el grupo como "activo" visualmente.
   */
  public isGroupActive(navKey: string): boolean {
    const options: IsActiveMatchOptions = {
      paths: 'subset',         // Coincidencia parcial de la ruta
      queryParams: 'subset',   // Coincidencia parcial de parámetros
      matrixParams: 'subset',  // Coincidencia parcial de parámetros de matriz
      fragment: 'ignored'      // Ignora el fragmento (#seccion) de la URL
    };

    // Devuelve true si alguna de las rutas del grupo está activa
    return this.routesNav()[navKey].some(route =>
      this.router.isActive(route.path, options)
    );
  }
}
