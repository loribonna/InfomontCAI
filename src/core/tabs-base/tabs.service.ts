import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ITab } from './tabs-base.component';

@Injectable()
export class TabsService {
    private activeTab: ITab;

    private tabChange = new Subject<ITab>();
    tabChange$ = this.tabChange.asObservable();

    onTabChange(tab: ITab) {
        this.activeTab = tab;
        this.tabChange.next(tab);
    }

    isActiveTab(tab: ITab) {
        return this.activeTab.name === tab.name;
    }
}
