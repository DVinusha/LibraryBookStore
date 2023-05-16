import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(`http://localhost:8080/auth/register`, data);
  }

  login(data: any) {
    return this.http.post(`http://localhost:8080/auth/authenticate`, data);
  }
}
