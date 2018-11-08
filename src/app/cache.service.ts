import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { IImage } from "./shelter/shelter.service";

export interface IImageData {
    file: IImage;
    url: any;
}

@Injectable()
export class CacheService {
    private data: object = {};
    private images: IImageData[] = [];
    private _id: string;

    private updateDataSubject = new Subject<{ section: string, data: any }>();
    updateData$ = this.updateDataSubject.asObservable();

    private insertImageSubject = new Subject<IImageData>();
    insertImage$ = this.insertImageSubject.asObservable();

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

    insertImage(image: IImageData): void {
        if (!this.images.findIndex(doc => (doc.url === image.url) || doc.file && (<IImage>doc.file)._id === image.file._id)) {
            this.images.push(image);
            this.insertImageSubject.next(image);
        }
    }

    insertImages(images: IImageData[]): void {
        images.forEach(image => this.insertImage(image));
    }

    getImages(): IImageData[] {
        return this.images;
    }
}
