import { Component } from '@angular/core';
import { SecureService } from './secure/secure.service';
import { RestSecureService } from './rest/rest.secure.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'secure';

  values$: Observable<any> = of([]);

  constructor(private readonly secureService: SecureService,
              restSecureService: RestSecureService) {

  }

  loadValues(): void {
    this.values$ = this.secureService.makeRequest();
  }
}
