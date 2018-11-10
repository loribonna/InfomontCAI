import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ImagesComponent } from "./images.component";
import { ImageViewModule } from "../../../core/image-view/image-view.module";
import { ImageGalleryModule } from "src/core/image-gallery/image-gallery.module";

@NgModule({
  declarations: [ImagesComponent],
  imports: [CommonModule, ImageViewModule, ImageGalleryModule],
  exports: [ImagesComponent]
})
export class ImagesModule {}
