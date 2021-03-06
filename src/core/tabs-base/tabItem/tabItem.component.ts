import {
    Component,
    OnInit,
    Input,
    Directive,
    Injectable,
    Output,
    EventEmitter
} from "@angular/core";
import { ITab } from "../tabs-base.component";
import { Subject } from "rxjs";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";

let _nextItemID = 0;

@Injectable()
export class TabItemService {
    private selectionSource = new Subject<number>();
    selection$ = this.selectionSource.asObservable();

    selectTab(itemID: number) {
        this.selectionSource.next(itemID);
    }
}

@Component({
    selector: "app-tab-item",
    templateUrl: "./tabItem.component.html",
    styleUrls: ["./tabItem.component.scss"],
    host: {
        role: "tabItem"
    }
})
export class TabItemComponent implements OnInit {
    @Input() content: ITab;
    @Output() selectionChange = new EventEmitter<ITab>();

    _itemID: number;
    active = false;
    _initialized = false;

    constructor(
        private tabsService: TabItemService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this._itemID = _nextItemID++;

        this.router.events.forEach(event => {
            if (!this._initialized && event instanceof NavigationEnd) {
                const child = this.route.firstChild;
                if (child) {
                    this._initialized = true;
                    if (this.content.link === child.routeConfig.path) {
                        this.active = true;
                    }
                }
            }
        });
    }

    ngOnInit() {
        const child = this.route.firstChild;
        if (child) {
            this._initialized = true;
            if (this.content.link === child.routeConfig.path) {
                this.active = true;
            }
        } else {
            if (this.content.default) {
                this.active = true;
            }
        }
    }

    selected(event: any) {
        this.selectionChange.emit(this.content);
        this.tabsService.selectTab(this._itemID);
    }
}
