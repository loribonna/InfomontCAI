import {
    Component,
    OnInit,
    QueryList,
    ContentChildren,
    OnDestroy,
    Output,
    EventEmitter,
    Input,
    ViewEncapsulation
} from "@angular/core";
import { TabItemComponent, TabItemService } from "./tabItem/tabItem.component";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";

export interface ITab {
    name: string;
    icon?: string;
    link: string;
    component: any;
    default?: boolean;
    section: string;
}

@Component({
    selector: "app-tabs-base",
    host: {
        role: "tabs-base",
        '[class.tabs-base]': 'true'
    },
    templateUrl: "./tabs-base.component.html",
    styleUrls: ["./tabs-base.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class TabsBaseComponent implements OnInit, OnDestroy {
    _selectedItemID: number;
    tabSub: Subscription;
    @ContentChildren(TabItemComponent) _tabs: QueryList<TabItemComponent>;

    constructor(
        private tabsService: TabItemService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.tabSub = this.tabsService.selection$.subscribe(tabID => {
            this._selectedItemID = tabID;
            this._tabs.forEach(tab => {
                tab.active = tab._itemID === tabID;
            });
        });
    }

    ngOnDestroy() {
        if (this.tabSub) {
            this.tabSub.unsubscribe();
        }
    }
}
