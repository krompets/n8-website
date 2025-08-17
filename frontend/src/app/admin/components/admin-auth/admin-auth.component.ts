import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-auth',
  template: `
    <div style="padding: 24px; text-align: center;">
      <h3 *ngIf="!error">Signing you in...</h3>
      <h3 *ngIf="error" style="color:#dc3545;">Access denied</h3>
      <p *ngIf="error">Your email is not allowed. Contact administrator.</p>
    </div>
  `
})
export class AdminAuthComponent implements OnInit {
  error = false;
  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const token = params.get('token');
      const error = params.get('error');
      if (error === 'forbidden') {
        this.error = true;
        return;
      }
      if (token) {
        this.auth.setToken(token);
      }
      this.router.navigate(['/admin/projects']);
    });
  }
}


