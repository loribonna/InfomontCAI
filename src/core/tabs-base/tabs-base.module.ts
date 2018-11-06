import { NgModule } from '@angular/core';
import { TabsBaseComponent } from './tabs-base.component';
import { TabItemModule } from './tabItem/tabItem.module';
import { TabItemService } from './tabItem/tabItem.component';
@NgModule({
    imports: [TabItemModule],
    declarations: [
        TabsBaseComponent
    ],
    exports: [
        TabsBaseComponent,
        TabItemModule
    ],
    providers: [TabItemService]
})
export class TabsBaseModule { }
