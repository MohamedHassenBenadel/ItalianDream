import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  private apiUrl = 'http://localhost:8080/apiclient';

  constructor(private http: HttpClient) {}

  login(clientId: string, password: string): Observable<any> {
    const body = { clientId, password };
    return this.http.post<any>(`${this.apiUrl}/login`, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


//Password Recovery Services : 

verifyClientByEmail(email: string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/verifyclient`, {
    params: { email: email }, 
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  });
}

verifyClientByCode(email: string, code: number): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/verify-code`, null, {
    params: { email, code },
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  });
}

resetPassword(email: string, password: string): Observable<any> {
  const body = { email, password }; 
  return this.http.put<any>(`${this.apiUrl}/reset-password`, body, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  });
}



}
