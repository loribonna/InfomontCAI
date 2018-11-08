import { NgModule } from "@angular/core"; 
import { CommonModule } from "@angular/common";
import { ImageFullComponent } from "./image-full.component";
import { IconModule } from "../icon/icon.module";

@NgModule({
  declarations: [ImageFullComponent],
  imports: [CommonModule, IconModule],
  exports: [ImageFullComponent]
})
export class ImageFullModule {}
