import { Observable } from 'rxjs';

export interface HttpService {

	get<T>(url: string): Observable<T>;

	post<T>(url: string): Observable<T>;
}
