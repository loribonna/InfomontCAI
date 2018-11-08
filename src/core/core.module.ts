import { NgModule } from '@angular/core';
import { TabsBaseModule } from './tabs-base/tabs-base.module';
import { ImageViewModule } from './image-view/image-view.module';
import { ImageFullModule } from './image-full/image-full.module';
import { IconModule } from './icon/icon.module';

const CORE_COMPONENT_MODULES = [
    TabsBaseModule,
    ImageViewModule,
    ImageFullModule,
    IconModule
];

@NgModule({
    imports: CORE_COMPONENT_MODULES,
    exports: CORE_COMPONENT_MODULES
})
export class CoreModule {}

