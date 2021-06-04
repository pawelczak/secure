import { Component } from '@angular/core';
import { ClosureService } from './http/closure/closure.service';
import { Observable, of } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	title = 'secure';

	values$: Observable<any> = of([]);

	constructor(private readonly closureService: ClosureService) {

	}

	loadValues(): void {
		this.values$ = this.closureService.get('http://localhost:3000/posts');
	}
}
