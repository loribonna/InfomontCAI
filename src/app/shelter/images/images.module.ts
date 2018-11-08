import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ImagesComponent } from "./images.component";
import { ImageFullModule } from "../../../core/image-full/image-full.module";
import { ImageViewModule } from "../../../core/image-view/image-view.module";

@NgModule({
  declarations: [ImagesComponent],
  imports: [CommonModule, ImageViewModule, ImageFullModule],
  exports: [ImagesComponent]
})
export class ImagesModule {}
