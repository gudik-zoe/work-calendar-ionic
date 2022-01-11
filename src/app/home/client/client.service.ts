import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  addClient(client: any) {
    return this.http
      .post('http://localhost:8080/client/', { fullName: 'weila  khoury' })
      .toPromise();
  }
  constructor(private http: HttpClient) {}

  public getClients() {
    return this.http.get('http://localhost:8080/client/').toPromise();
  }
}
