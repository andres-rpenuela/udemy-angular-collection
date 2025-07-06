import {Component, signal} from '@angular/core';
import {RouterLink, RouterLinkActive, Routes} from '@angular/router';
import {routes} from 'app/app.routes';

/**
 * Componente que representa un menú lateral compartido.
 * Este componente genera dinámicamente los elementos del menú
 * basándose en las rutas definidas en la aplicación.
 */
@Component({
  selector: 'shared-sidemenu', // Selector del componente para usarlo en plantillas.
  imports: [
    RouterLink,
    RouterLinkActive
  ], // Importaciones necesarias para el componente (vacío en este caso).
  templateUrl: './sidemenu.component.html', // Ruta al archivo de plantilla HTML.
  styles: `` // Estilos específicos del componente (vacío en este caso).
})
export class SidemenuComponent {

  /**
   * Señal que contiene los elementos del menú generados dinámicamente.
   * Se inicializa con el resultado del metodo `readRoutes`.
   */
  public readonly menuItems = signal(this.readRoutes());

  constructor() {}

  /**
   * Metodo privado que procesa las rutas de la aplicación para generar
   * los elementos del menú.
   *
   * @returns {Routes[]} Un array de rutas filtradas y procesadas.
   */
  private readRoutes(): Routes {
    // Obtiene las rutas hijas de cada ruta principal, las aplana en un único array,
    // elimina rutas vacías y rutas no deseadas, y filtra aquellas que contienen parámetros.
    const dashboardRoutes: Routes = routes
      .map(route => route.children ?? []) // Obtiene las rutas hijas o un array vacío.
      .flat() // Aplana el array de arrays en un único array.
      .filter(route => route.path != '' && route.path != '**') // Filtra rutas vacías y comodines.
      .filter(route => !route.path?.includes(':')); // Filtra rutas que no contienen parámetros.

    console.log({dashboardRoutes}); // Muestra las rutas procesadas en la consola.

    return dashboardRoutes; // Devuelve las rutas procesadas.
  }
}
