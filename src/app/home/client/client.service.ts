import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from 'src/app/models/client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}
  rootUrl: string = environment.rootUrl + 'client/';

  public addClient(client: Client) {
    return this.http.post(this.rootUrl, client).toPromise();
  }

  public getClients() {
    return this.http.get(this.rootUrl).toPromise();
  }

  public deleteClient(id: number) {
    return this.http.delete(this.rootUrl + id).toPromise();
  }
}
