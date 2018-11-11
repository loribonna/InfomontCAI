import { Component, OnInit, Input, HostListener } from "@angular/core";
import { IImageData, CacheService } from "src/app/cache.service";

@Component({
  selector: "app-images",
  templateUrl: "./images.component.html",
  styleUrls: ["./images.component.scss"]
})
export class ImagesComponent implements OnInit {
  images: IImageData[] = [];
  downloading = false;
  _fullView = false;

  constructor(
    private cache: CacheService
  ) {}

  ngOnInit() {
    this.downloading = true;
    this.cache.loadShelterImages().forEach(image => {
      this.images.push(image);
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
