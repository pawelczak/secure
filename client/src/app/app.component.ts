import { Component } from '@angular/core';
import { ClosureService } from './http/closure/closure.service';
import { Observable, of } from 'rxjs';
import { Message } from './message/message';
import { WebWorkerService } from './http/web-worker/web-worker.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	title = 'secure';

	messages$: Observable<Array<Message>> = of([]);

	constructor(private readonly closureService: ClosureService,
				private readonly webWorkerService: WebWorkerService) {
	}

	loadValues(): void {
		// this.messages$ = this.closureService.get('http://localhost:3000/posts');

		this.webWorkerService.getPosts();
	}
}
