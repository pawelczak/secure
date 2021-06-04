import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { EMPTY, Observable } from 'rxjs';
import { Vulnerabilities } from '../closure/vulnerabilities';

@Injectable({
	providedIn: 'root'
})
export class WebWorkerService implements HttpService {

	private readonly worker = new Worker('../../http/web-worker/http.worker', { type: 'module' });

	constructor() {

		Vulnerabilities.enableHttpPrototypePatch();

		this.worker.onmessage = ({ data }) => {
			console.log(data);
			console.log(`page got message: ${data}`);
		};
		this.worker.postMessage('LOGIN');
	}

	getPosts(): void {
		this.worker.postMessage('POSTS');
	}

	get<T>(url: string): Observable<T> {
		return EMPTY;
	}

	post<T>(url: string): Observable<T> {
		return EMPTY;
	}


}
