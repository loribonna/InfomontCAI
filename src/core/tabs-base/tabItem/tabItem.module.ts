import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabItemComponent } from './tabItem.component';
import { TabsService } from '../tabs.service';

@NgModule({
  declarations: [TabItemComponent],
  imports: [
    CommonModule
  ],
  exports: [
    TabItemComponent
  ],
  providers: [ TabsService ]
})
export class TabItemModule { }
