import {Component, computed, input, linkedSignal} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'shared-pagination',
  imports: [
    RouterLink
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {

  currentPage = input<number>(1);
  pages = input(0);

  // una vez inicialidad se trabaja como una señal normal y correinte, si currentPage cambia, activePage no cambia
  activePage = linkedSignal( () => this.currentPage() ?? 1 );

  getPagesList = computed( () => {
    // Crea un array de números del 1 al this.pages(), inclusive.
    /**
     * this.pages()
     *  → es una señal que devuelve un número, por ejemplo 5.
     *
     * Array.from({ length: this.pages() })
     *  → crea un array vacío de esa longitud. Por ejemplo, si pages() === 5, entonces se crea:
     * [empty × 5]
     *
     * El segundo parámetro de Array.from es una función map:
     * (_, i) => i + 1
     * _ es el valor, que en este caso, no se define
     * i es el índice del array (0, 1, 2, 3, 4)
     *
     * **Nota**:  En JavaScript y TypeScript, el guion bajo (_) es solo un nombre de variable como cualquier otro, pero se usa por convención cuando no necesitas ese valor.
     *
     * Resultado final: [1, 2, 3, ..., this.pages()]
     * Por ejemplo, si this.pages() === 5, el resultado será: [1, 2, 3, 4, 5]
     */
    return Array.from({ length: this.pages() }, (_,i) => i+1);
  });

}
