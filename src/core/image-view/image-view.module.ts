import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageViewComponent, FullImageDirective } from './image-view.component';

@NgModule({
  declarations: [ImageViewComponent, FullImageDirective],
  exports: [ImageViewComponent, FullImageDirective],
  imports: [CommonModule]
})
export class ImageViewModule { }
