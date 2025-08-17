import { Component, OnInit } from '@angular/core';
import { AllowedEmailsService, AllowedEmail } from '../../services/allowed-emails.service';

@Component({
  selector: 'app-allowed-emails',
  template: `
    <div style="max-width:600px;margin:24px auto;">
      <h2>Allowed emails</h2>
      <form (submit)="add($event)">
        <input type="email" [(ngModel)]="newEmail" name="email" placeholder="user@example.com" required />
        <button type="submit">Add</button>
      </form>
      <div style="margin-top:12px;">
        <button (click)="logout()">Вийти</button>
      </div>
      <ul>
        <li *ngFor="let e of emails">
          {{ e.email }}
          <button (click)="remove(e.id)">Remove</button>
        </li>
      </ul>
    </div>
  `
})
export class AllowedEmailsComponent implements OnInit {
  emails: AllowedEmail[] = [];
  newEmail = '';
  constructor(private service: AllowedEmailsService) {}
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/api/auth/google';
      return;
    }
    this.load();
  }
  load() { this.service.list().subscribe(e => this.emails = e); }
  add(ev: Event) { ev.preventDefault(); if (!this.newEmail) return; this.service.add(this.newEmail).subscribe(() => { this.newEmail = ''; this.load(); }); }
  remove(id: number) { this.service.remove(id).subscribe(() => this.load()); }
  logout() { window.localStorage.removeItem('token'); window.location.href = '/admin'; }
}


