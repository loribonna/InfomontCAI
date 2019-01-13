import { Component, OnInit, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { IImageData } from 'src/app/cache.service';

export const enum KEY_CODES {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  ESC = 27,
  ENTER = 13
}

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {
  _fullViewImage = 0;
  _enabled = false;
  @Input() closeOnImage = false;
  @Input() content: IImageData[];
  @Input() toggleCloseButton = false;
  @Output() close = new EventEmitter<any>();

  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    switch (event.keyCode) {
      case KEY_CODES.LEFT_ARROW:
        this.previousImage(event);
        break;
      case KEY_CODES.RIGHT_ARROW:
        this.nextImage(event);
        break;
      case KEY_CODES.ESC:
        this.closeImage(event);
        break;
      default:
        return;
    }
  }

  @Input()
  get enabled() {
    return this._enabled;
  }
  set enabled(value: boolean) {
    this._enabled = value;
    this._fullViewImage = 0;
  }

  constructor() { }

  private _getCurrentImageData() {
    if (
      this.content &&
      this._fullViewImage != null &&
      this.content[this._fullViewImage]
    ) {
      return this.content[this._fullViewImage];
    } else {
      return null;
    }
  }

  ngOnInit() {
  }

  closeImage(event: Event) {
    this.close.emit();
  }

  imgClick(event: Event) {
    if (this.closeOnImage) {
      this.close.emit();
    } else {
      event.stopPropagation();
      this.nextImage(event);
    }
  }

  nextImage(event: Event) {
    if (this._fullViewImage < this.content.length - 1) {
      this._fullViewImage++;
    }
    if (event) { event.stopPropagation(); }
  }

  previousImage(event: Event) {
    if (this._fullViewImage > 0) {
      this._fullViewImage--;
    }
    if (event) { event.stopPropagation(); }
  }

  getFullViewImageSrc(): any {
    const data = this._getCurrentImageData();

    return data ? data.url || "" : "";
  }

  getCurrentDescription() {
    const data = this._getCurrentImageData();
    return data && data.file ? data.file.description || "" : "";
  }

}
