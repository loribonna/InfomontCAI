import { NgModule } from '@angular/core';
import { TabsBaseModule } from './tabs-base/tabs-base.module';

const CORE_COMPONENT_MODULES = [
    TabsBaseModule
];

@NgModule({
    imports: CORE_COMPONENT_MODULES,
    exports: CORE_COMPONENT_MODULES
})
export class CoreModule {}

