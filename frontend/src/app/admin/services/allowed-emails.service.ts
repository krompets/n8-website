import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface AllowedEmail { id: number; email: string; createdAt: string; }

@Injectable({ providedIn: 'root' })
export class AllowedEmailsService {
  private apiUrl = `${environment.apiUrl}/admin/allowed-emails`;
  constructor(private http: HttpClient) {}
  list(): Observable<AllowedEmail[]> { return this.http.get<AllowedEmail[]>(this.apiUrl); }
  add(email: string): Observable<AllowedEmail> { return this.http.post<AllowedEmail>(this.apiUrl, { email }); }
  remove(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
}


