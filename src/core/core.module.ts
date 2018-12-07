import { NgModule } from '@angular/core';
import { TabsBaseModule } from './tabs-base/tabs-base.module';
import { ImageViewModule } from './image-view/image-view.module';
import { IconModule } from './icon/icon.module';
import { ImageGalleryModule } from './image-gallery/image-gallery.module';
import { BcButtonModule } from './button/button.module';
import { BcContentModule } from './content/content.module';
import { NavbarModule } from './navbar/navbar.module';


const CORE_COMPONENT_MODULES = [
    TabsBaseModule,
    ImageViewModule,
    IconModule,
    ImageGalleryModule,
    BcButtonModule,
    BcContentModule,
    NavbarModule
];

@NgModule({
    imports: CORE_COMPONENT_MODULES,
    exports: CORE_COMPONENT_MODULES
})
export class CoreModule { }

