import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageViewComponent, SingleImageDirective } from './image-view.component';

@NgModule({
  declarations: [ImageViewComponent, SingleImageDirective],
  exports: [ImageViewComponent, SingleImageDirective],
  imports: [CommonModule]
})
export class ImageViewModule { }
