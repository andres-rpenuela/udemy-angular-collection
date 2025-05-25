import {Component, inject, input} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-shared-not-found',
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
  standalone: true
})
export class NotFoundComponent {
    public messageError = input<string>('Not found');

    public location = inject(Location);

    public goBack(): void {
      this.location.back();
    }
}
