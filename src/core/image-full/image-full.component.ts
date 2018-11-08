import { Component, OnInit, HostListener, Input, Directive, Output, EventEmitter } from "@angular/core";
import { IImageData } from "src/app/cache.service";

@Directive({
  selector: "img[appFullImage]",
  host: {
    "[class.img-full-view]": "appFullImage"
  }
})
export class FullImageDirective {
  @Input() appFullImage: boolean;
}

@Component({
  selector: "app-image-full",
  templateUrl: "./image-full.component.html",
  styleUrls: ["./image-full.component.scss"]
})
export class ImageFullComponent implements OnInit {
  @Input() content: IImageData[];
  @Input() enabled = false;
  @Output() close = new EventEmitter<any>();
  @Output() next = new EventEmitter<any>();
  @Output() previous = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  closeImage() {
    this.close.emit();
  }

  nextImage() {
    this.next.emit();
  }

  previousImage() {
    this.previous.emit();
  }
}
