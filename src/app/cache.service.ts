import { Injectable } from "@angular/core";
import { Subject, Observable, of as obsOf, from as obsFrom } from "rxjs";
import { IImage, ShelterService } from "./shelter/shelter.service";
import { map, mergeMap, merge } from "rxjs/operators";
import { Buffer } from "buffer";
export interface IImageData {
  file: IImage;
  url: any;
}

@Injectable()
export class CacheService {
  private data: object = {};
  private images: IImageData[] = [];
  private _id: string;

  private updateDataSubject = new Subject<{ section: string; data: any }>();
  updateData$ = this.updateDataSubject.asObservable();

  private insertImageSubject = new Subject<IImageData>();
  insertImage$ = this.insertImageSubject.asObservable();

  private setIdSubject = new Subject<string>();
  setId$ = this.setIdSubject.asObservable();

  constructor(private shelterService: ShelterService) {}

  private _getSectionFromShelId(
    shelId: string,
    section: string
  ): Observable<object> {
    return this.shelterService.getShelterSection(shelId, section).pipe(
      map(shelData => {
        this.updateData(section, shelData);
        return shelData;
      })
    );
  }

  private _getImagesFromShelId(shelId: string): Observable<IImageData> {
    return this.shelterService.getImagesByShelter(shelId).pipe(
      mergeMap(images => images),
      mergeMap(image => this.shelterService.getFile((<any>image)._id)),
      mergeMap(image => this._parseImage(image))
    );
  }

  private _parseImage(fileData: IImage): Promise<IImageData> {
    return new Promise<IImageData>((resolve, reject) => {
      const data = Buffer.from(fileData.data);
      const blob = new Blob([data], { type: <string>fileData.contentType });
      const reader = new FileReader();
      let result: IImageData;
      reader.onload = e => {
        const src = reader.result;
        result = { file: fileData, url: src };
      };
      reader.onloadend = e => {
        resolve(result);
      };
      reader.onerror = err => {
        reject(err);
      };
      reader.onabort = e => {
        reject(e);
      };
      reader.readAsDataURL(blob);
    });
  }

  loadShelterImages(shelId?: string): Observable<IImageData> {
    const cachedData = this._getImages();
    if (!cachedData) {
      return obsFrom(cachedData);
    } else {
      if (shelId) {
        return this._getImagesFromShelId(shelId);
      } else {
        return this.getId().pipe(mergeMap(id => this._getImagesFromShelId(id)));
      }
    }
  }

  loadShelterSection(section: string, shelId?: string): Observable<object> {
    const data = this.getDataSection(section);
    if (!data) {
      if (!shelId) {
        return this.getId().pipe(
          mergeMap(id => this._getSectionFromShelId(id, section))
        );
      } else {
        return this._getSectionFromShelId(shelId, section);
      }
    } else {
      return obsOf(data);
    }
  }

  updateData(section: string, data: any): void {
    this.data[section] = data;
    this.updateDataSubject.next({ section: section, data: data });
  }

  getDataSection(section: string): object {
    return this.data[section];
  }

  setId(id: string) {
    if (id) {
      this.setIdSubject.next(id);
      this._id = id;
    }
  }

  getId(): Observable<string> {
    if (this._id) {
      return obsOf(this._id);
    } else {
      return this.setId$;
    }
  }

  insertImage(image: IImageData): void {
    if (
      !this.images.findIndex(
        doc =>
          doc.url === image.url ||
          (doc.file && (<IImage>doc.file)._id === image.file._id)
      )
    ) {
      this.images.push(image);
      this.insertImageSubject.next(image);
    }
  }

  private _insertImages(images: IImageData[]): void {
    images.forEach(image => this.insertImage(image));
  }

  private _getImages(): IImageData[] {
    return this.images;
  }
}
