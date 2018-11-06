import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from 'rxjs/operators';
import { throwError as observableThrowError, Observable } from 'rxjs';

@Injectable()
export class ShelterService {
    private sheltersBaseUrl = '/api/shelters';

    constructor(private http: HttpClient) { }

    getShelter(id: String): Observable<object> {
        return this.http.get(this.sheltersBaseUrl + `/${id}`).pipe(
            catchError(this.handleError.bind(this)));
    }

    getShelterSection(id: String, section: string): Observable<object> {
        return this.http.get(this.sheltersBaseUrl + `/${id}/${section}`).pipe(
            catchError(this.handleError.bind(this)));
    }

    getFIlesByTypes(types): Observable<object[]> {
        let query = '?';
        types.forEach(type => {
            query += 'types[]=' + type + '&';
        });
        query = query.substring(0, query.length - 1);
        return this.http.get(this.sheltersBaseUrl + "/files/byType" + query).pipe(
            map(res => Array.isArray(res) ? <any>res : []),
            catchError(this.handleError.bind(this)));
    }

    handleError(error: any) {
        console.error('server error:', error);
        if (error && error.status === 500) {
            //  location.href="/pageNotFound"
        }

        if (error instanceof Response) {
            let errMessage = '';
            try {
                errMessage = (<any>error).error;
            } catch (err) {
                errMessage = error.statusText;
            }
            return observableThrowError(errMessage);
        }
        return observableThrowError(error || 'Node.js server error');
    }
}
