import { Observable, ReplaySubject } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

export class AccessToken {

	private readonly token$ = new ReplaySubject<string>();

	constructor() {
	}

	set(token: string): void {
		this.token$.next(token);
	}

	on(callback: (token: string) => Observable<any>): Observable<any> {
		return this.token$
				   .pipe(
					   take(1),
					   switchMap((token: string) => callback(token))
				   );
	}

}
