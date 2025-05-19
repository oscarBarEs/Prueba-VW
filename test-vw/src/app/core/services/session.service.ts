import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

const BASE_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZjU4OWVlOWE2M2ZmZWFlMGU1ZjIzNWU3NjAxZDZlZiIsIm5iZiI6MTc0NzQ5NTQ1OS4yMDk5OTk4LCJzdWIiOiI2ODI4YWEyMzEyNzI0YTM4NjMwYmNlODUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.lNw3Q5ddJ2OKV9tESzWVUuCCKTA-UMNqJ7k3fCa3Joc';
@Injectable({ providedIn: 'root' })
export class SessionService {
  private tokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  async initSession() {
    const url = 'https://api.themoviedb.org/3/authentication/guest_session/new';
    const headers = new HttpHeaders({
      'Authorization': BASE_TOKEN,
      'accept': 'application/json'
    });
    await firstValueFrom(this.http.get(url, { headers }));
    this.tokenSubject.next(BASE_TOKEN);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }
}