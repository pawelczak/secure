import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMPTY, never, Observable } from 'rxjs';
import { AccessToken } from './access-token';
import { Vulnerabilities } from './vulnerabilities';

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

		Vulnerabilities.enableHttpPrototypePatch();

		((clazz: HttpService) => {

			const token = new AccessToken();

			clazz.get = <T>(url: string): Observable<T> => {

				return token.on((accessToken: string) => {

					const httpHeaders = new HttpHeaders({
						Authorization: 'Bearer ' + accessToken
					});

					return httpClient.get<T>(url, {
						headers: httpHeaders
					});
				});
			};

			clazz.post = <T>(url: string): Observable<T> => {

				return token.on((accessToken: string) => {

					const httpHeaders = new HttpHeaders({
						Authorization: 'Bearer ' + accessToken
					});

					return httpClient.post<T>(url, {
						headers: httpHeaders
					});
				});
			};

			const fetchAccessToken = () => {

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
						token.set(data.accessToken);
					});
			};

			fetchAccessToken();

		})(this);
	}

	get<T>(url: string): Observable<T> {
		return EMPTY;
	}

	post<T>(url: string): Observable<T> {
		return EMPTY;
	}

}
