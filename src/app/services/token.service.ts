import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly TOKEN_KEY = 'x-auth-token';

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken(); // Retorna true si hay un token almacenado
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
  logout(): void {
    this.removeToken(); // Llamar a esta función cuando el usuario cierre sesión
  }
}