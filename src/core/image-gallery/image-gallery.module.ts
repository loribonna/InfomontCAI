import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageGalleryComponent } from './image-gallery.component';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [ImageGalleryComponent],
  exports: [ImageGalleryComponent],
  imports: [
    CommonModule, IconModule
  ]
})
export class ImageGalleryModule { }
