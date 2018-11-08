import { Component, OnInit, Input } from "@angular/core";
import { IImageData } from "src/app/cache.service";

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

  getFirstImages(): IImageData[] {
    return this.content.slice(0, 4);

    /*if (!this.downloading) {
      return this.images.slice(0, 4);
    } else {
      return [];
    }*/
  }
}
