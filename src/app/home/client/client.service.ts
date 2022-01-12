import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}
  rootUrl: string = environment.rootUrl + 'client/';

  public addClient(client: any) {
    return this.http.post(this.rootUrl, client).toPromise();
  }

  public getClients() {
    return this.http.get(this.rootUrl).toPromise();
  }
}
