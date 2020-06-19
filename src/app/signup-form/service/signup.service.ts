import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SingupRequest } from './signup-request.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private http: HttpClient) {}

  signup(data: SingupRequest): Observable<any> {
    return this.http.post('https://demo-api.now.sh/users', data);
  }
}
