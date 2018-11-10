import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from 'rxjs/operators';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { Buffer } from 'buffer';

export enum File_Type {
    doc,
    map,
    invoice,
    image,
    contribution
}

export interface IImage {
    _id?: String;
    size?: Number;
    shelterId?: String;
    uploadDate?: Date;
    md5?: String;
    name?: String;
    data?: Buffer;
    contentType?: String;
    type?: File_Type;
    description?: String;
}

@Injectable()
export class ShelterService {
    private sheltersBaseUrl = 'http://localhost:8000/api/shelters';

    constructor(private http: HttpClient) { }

    downloadFile(id) {
        const queryFileSub = this.getFile(id).subscribe(file => {
            const e = document.createEvent('MouseEvents');
            const data = Buffer.from(file.data);
            const blob = new Blob([data], { type: <string>file.contentType });
            const a = document.createElement('a');
            a.download = <string>file.name;
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = [file.contentType, a.download, a.href].join(':');
            e.initEvent('click', true, false);
            a.dispatchEvent(e);
            if (queryFileSub) {
                queryFileSub.unsubscribe();
            }
        });
    }

    getFile(id): Observable<IImage> {
        return this.http.get(this.sheltersBaseUrl + `/file/${id}`).pipe(
            catchError(this.handleError.bind(this)));
    }

    getShelter(id: String): Observable<object> {
        return this.http.get(this.sheltersBaseUrl + `/${id}`).pipe(
            catchError(this.handleError.bind(this)));
    }

    getShelterSection(id: String, section: string): Observable<object> {
        return this.http.get(this.sheltersBaseUrl + `/${id}/${section}`).pipe(
            catchError(this.handleError.bind(this)));
    }

    getImagesByShelter(shelId: string): Observable<IImage[]> {
        return this.getFilesByShelterIdAndType(shelId, [File_Type.image]);
    }

    private getFilesByShelterIdAndType(id, types: File_Type[]): Observable<IImage[]> {
        let query = '';
        if (types && types.length > 0) {
            query = '?';
            types.forEach(type => {
                query += 'types[]=' + type + '&';
            });
            query = query.substring(0, query.length - 1);
        }
        return this.http.get(this.sheltersBaseUrl + `/file/byshel/${id}/bytype` + query).pipe(
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
