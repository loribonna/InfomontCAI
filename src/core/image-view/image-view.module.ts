import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageViewComponent } from './image-view.component';

@NgModule({
  declarations: [ImageViewComponent],
  exports: [ImageViewComponent],
  imports: [CommonModule]
})
export class ImageViewModule { }
