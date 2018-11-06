import { NgModule } from '@angular/core';
import { TabsBaseComponent } from './tabs-base.component';
import { TabItemModule } from './tabItem/tabItem.module';
@NgModule({
    imports: [TabItemModule],
    declarations: [
        TabsBaseComponent
    ],
    exports: [
        TabsBaseComponent,
        TabItemModule
    ],
    providers: []
})
export class TabsBaseModule { }
