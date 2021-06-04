import { ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';

export class AccessToken {

	private readonly token$ = new ReplaySubject<string>();

	constructor() {
	}

	set(token: string): void {
		this.token$.next(token);
	}

	on(callback: (token: string) => any): any {
		return this.token$
				   .pipe(take(1))
				   .subscribe((token: string) => callback(token));
	}

}
