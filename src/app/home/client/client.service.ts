import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/models/client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}
  rootUrl: string = environment.rootUrl + 'client/';

  public clients: Client[];

  public addClient(client: Client) {
    return this.http.post<Client>(this.rootUrl, client).toPromise();
  }

  public updateClient(client: Client) {
    return this.http.put<Client>(this.rootUrl, client).toPromise();
  }

  public getClients() {
    return this.http.get<Client[]>(this.rootUrl).toPromise();
  }

  public deleteClient(id: number) {
    return this.http.delete(this.rootUrl + id).toPromise();
  }
}
