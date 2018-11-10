import { Component, OnInit, Input, HostListener } from "@angular/core";
import { IImageData, CacheService } from "src/app/cache.service";
import { ShelterService, IImage } from "../shelter.service";
import { mergeMap } from "rxjs/operators";
import { Buffer } from "buffer";

@Component({
  selector: "app-images",
  templateUrl: "./images.component.html",
  styleUrls: ["./images.component.scss"],
  providers: [ShelterService]
})
export class ImagesComponent implements OnInit {
  @Input() shelterId: string;
  images: IImageData[] = [];
  downloading = false;
  _fullView = false;

  constructor(
    private cache: CacheService,
    private shelterService: ShelterService
  ) { }

  ngOnInit() {
    if (this.shelterId) {
      this.downloading = true;
      const cachedData = this.cache.getImages();
      if (!cachedData) {
        this.images = cachedData;
      } else {
        this.shelterService
          .getImagesByShelter(this.shelterId)
          .pipe(
            mergeMap(images => images),
            mergeMap(image => this.shelterService.getFile((<any>image)._id))
          )
          .forEach(async image => {
            await this.loadImage(image);
          })
          .then(() => {
            this.downloading = false;
          });
      }
    }
  }

  loadImage(fileData: IImage): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const data = Buffer.from(fileData.data);
      const blob = new Blob([data], { type: <string>fileData.contentType });
      const reader = new FileReader();
      reader.onload = e => {
        const src = reader.result;
        this.images.push({ file: fileData, url: src });
      };
      reader.onloadend = e => {
        resolve();
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

  getImagesSlice() {
    return this.images.slice(0, 4);
  }

  getImages() {
    return this.images;
  }

  isFullViewEnabled(): boolean {
    return this._fullView;
  }

  openImageView() {
    this._fullView = true;
  }

  closeImageView() {
    this._fullView = false;
  }
}
