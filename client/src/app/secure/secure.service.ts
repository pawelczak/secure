import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class SecureService {

  constructor(private readonly httpClient: HttpClient) {
    ((clazz: any) => {

      let accessToken: string;

      clazz.makeCall = () => {
        const httpHeaders = new HttpHeaders({
          Authorization: 'Bearer ' + accessToken
        });

        return httpClient.get('http://localhost:3000/posts', {
          headers: httpHeaders
        });
      };

      fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: 'Lukasz'
        })
      })
        .then(response => response.json())
        .then((data) => {
          accessToken = data.accessToken;
        });

    })(this);
  }


  makeRequest(): Observable<any> {
    return (this as any).makeCall();
  }

}
