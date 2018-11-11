import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabItemComponent } from './tabItem.component';
import { BcButtonModule } from 'src/core/button/button.module';

@NgModule({
  declarations: [TabItemComponent],
  imports: [
    CommonModule, BcButtonModule
  ],
  exports: [
    TabItemComponent
  ],
  providers: []
})
export class TabItemModule { }
