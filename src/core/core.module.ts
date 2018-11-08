import { NgModule } from '@angular/core';
import { TabsBaseModule } from './tabs-base/tabs-base.module';
import { ImageViewModule } from './image-view/image-view.module';
import { ImageFullModule } from './image-full/image-full.module';
const CORE_COMPONENT_MODULES = [
    TabsBaseModule,
    ImageViewModule,
    ImageFullModule
];

@NgModule({
    imports: CORE_COMPONENT_MODULES,
    exports: CORE_COMPONENT_MODULES
})
export class CoreModule {}

