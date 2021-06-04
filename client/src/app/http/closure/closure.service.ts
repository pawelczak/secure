import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { never, Observable } from 'rxjs';

declare var window: any;

export interface HttpService {

	get<T>(url: string): Observable<T>;

	post<T>(url: string): Observable<T>;
}

@Injectable({
	providedIn: 'root'
})
export class ClosureService implements HttpService {

	private static readonly USERNAME = 'Lukasz';

	constructor(private readonly httpClient: HttpClient) {
		((clazz: HttpService) => {

			let accessToken: string;

			clazz.get = <T>(url: string): Observable<T> => {
				const httpHeaders = new HttpHeaders({
					Authorization: 'Bearer ' + accessToken
				});

				return httpClient.get<T>(url, {
					headers: httpHeaders
				});
			};

			clazz.post = <T>(url: string): Observable<T> => {

				const httpHeaders = new HttpHeaders({
					Authorization: 'Bearer ' + accessToken
				});

				return httpClient.post<T>(url, {
					headers: httpHeaders
				});
			};

			const httpHeaders = new HttpHeaders({
				'Content-Type': 'application/json'
			});

			this.httpClient.post('http://localhost:4000/login', {
					headers: httpHeaders,
					body: JSON.stringify({
						username: ClosureService.USERNAME
					})
				})
				.subscribe((data: any) => {
					accessToken = data.accessToken;
					console.log(accessToken)
				});

		})(this);
	}

	get<T>(url: string): Observable<T> {
		return never();
    }

	post<T>(url: string): Observable<T> {
		return never();
    }

}
