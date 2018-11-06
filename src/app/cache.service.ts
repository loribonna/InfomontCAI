import { Injectable } from "@angular/core";
import { Subject } from "rxjs";


@Injectable()
export class CacheService {
    private data: object = {};
    private _id: string;

    private updateDataSubject = new Subject<{ section: string, data: any }>();
    updateData$ = this.updateDataSubject.asObservable();

    private getDataSubject = new Subject<string>();
    getData$ = this.getDataSubject.asObservable();

    updateData(section: string, data: any): void {
        this.data[section] = data;
        this.updateDataSubject.next({ section: section, data: data });
    }

    getDataSection(section: string): object {
        return this.data[section];
    }

    setId(id: string) {
        if (!this._id) {
            this._id = id;
        }
    }

    getId() {
        return this._id;
    }
}
