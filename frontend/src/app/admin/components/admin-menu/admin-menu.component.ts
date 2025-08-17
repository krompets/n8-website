import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-menu',
  template: `
    <nav class="admin-nav">
      <a routerLink="/admin/projects" routerLinkActive="active" class="nav-link">Projects</a>
      <button class="logout" (click)="logout()">Logout</button>
    </nav>
  `,
  styles: [`
    .admin-nav { display: flex; justify-content: space-between; align-items: center; padding: 12px 20px; margin: 12px 0; background: rgba(255,255,255,0.06); border-radius: 10px; }
    .nav-link { color: #e9edf6; text-decoration: none; font-weight: 600; }
    .nav-link.active { text-decoration: underline; }
    .logout { background: #dc3545; color: #fff; border: none; padding: 8px 14px; border-radius: 8px; cursor: pointer; }
  `]
})
export class AdminMenuComponent {
  constructor(private auth: AuthService) {}
  logout() { this.auth.logout(); }
}


