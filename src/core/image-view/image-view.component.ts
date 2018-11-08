import { Component, OnInit, Input, Directive } from "@angular/core";
import { IImageData } from "src/app/cache.service";

@Directive({
  selector: "[appSingle]",
  host: {
    "[class.img-box-cell-single]": "appSingle"
  }
})
export class SingleImageDirective {
  @Input() appSingle: boolean;
}

@Component({
  selector: "app-image-view",
  templateUrl: "./image-view.component.html",
  styleUrls: ["./image-view.component.scss"]
})
export class ImageViewComponent implements OnInit {
  @Input() content: IImageData[] = [];
  // @Input() downloading = false;

  constructor() {}

  ngOnInit() {}

  isSingleImage() {
    return this.content && this.content.length === 1;
  }

  getSingleImage(): IImageData {
    return this.content[0];
  }

  getFirstImages(): IImageData[] {
    return this.content.slice(0, 2);

    /*if (!this.downloading) {
      return this.images.slice(0, 4);
    } else {
      return [];
    }*/
  }

  getLastImages(): IImageData[] {
    return this.content.slice(2, 4);
  }
}
