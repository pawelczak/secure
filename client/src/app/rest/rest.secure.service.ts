import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestSecureService {

  private static readonly url = 'https://api.github.com/search/repositories?per_page=100&q=Tetris';

  constructor(private readonly httpClient: HttpClient) {

    // tslint:disable-next-line:no-eval
    // const fun = XMLHttpRequest.prototype.setRequestHeader;
    //
    // XMLHttpRequest.prototype.setRequestHeader = (name: string, value: string) => {
    //   fun.call(this, name, value);
    // };
  }

  search(): any {

    return this.httpClient.get(RestSecureService.url);
  }

}

