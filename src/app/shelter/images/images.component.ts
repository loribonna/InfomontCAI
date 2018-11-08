import { Component, OnInit, Input, HostListener } from "@angular/core";
import { IImageData, CacheService } from "src/app/cache.service";
import { ShelterService, IImage } from "../shelter.service";
import { mergeMap } from "rxjs/operators";
import { Buffer } from "buffer";

export const enum KEY_CODES {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

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
  _fullViewImage: number;

  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    if (this._fullView) {
      if (event.keyCode === KEY_CODES.LEFT_ARROW) {
        this.previousImageView();
      } else if (event.keyCode === KEY_CODES.RIGHT_ARROW) {
        this.nextImageView();
      }
    }
  }

  constructor(
    private cache: CacheService,
    private shelterService: ShelterService
  ) {}

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

  isFullViewEnabled(): boolean {
    return this._fullView && this._fullViewImage != null;
  }

  getFullViewImageSrc(): any {
    if (
      this._fullView &&
      this._fullViewImage != null &&
      this.images[this._fullViewImage]
    ) {
      return this.images[this._fullViewImage].url;
    } else {
      return "";
    }
  }

  previousImageView() {
    if (this._fullViewImage > 0) {
      this._fullViewImage--;
    }
  }

  nextImageView() {
    if (this._fullViewImage < this.images.length - 1) {
      this._fullViewImage++;
    }
  }

  openImageView() {
    this._fullViewImage = 0;
    this._fullView = true;
  }

  closeImageView() {
    this._fullView = false;
  }
}
