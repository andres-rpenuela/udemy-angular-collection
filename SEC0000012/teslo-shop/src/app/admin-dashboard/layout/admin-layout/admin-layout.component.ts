import {Component, computed, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {AuthService} from '@auth/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

  protected authService = inject(AuthService);
  private router = inject(Router);

  protected user = computed(() => this.authService.user() );

  logout() {
    this.authService.logout()
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
