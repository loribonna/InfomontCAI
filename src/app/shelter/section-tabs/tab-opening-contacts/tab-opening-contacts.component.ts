import { Component, ViewEncapsulation } from '@angular/core';
import { TabItemBase } from '../tab.base';
import { ActivatedRoute } from '@angular/router';
import { CacheService } from 'src/app/cache.service';

@Component({
    selector: 'app-tab-opening-contacts',
    host: {
        '[class.op-contact-container]': 'true'
    },
    templateUrl: './tab-opening-contacts.component.html',
    styleUrls: ['./tab-opening-contacts.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TabOpeningContactsComponent extends TabItemBase {

    constructor(protected route: ActivatedRoute, protected cache: CacheService) {
        super(route, cache);
    }

    getOpeningProp(opening, prop) {
        return opening && opening[prop] ? opening[prop] : null;
    }

    checkOpeningDate(opening, prop) {
        return opening && opening[prop];
    }

    getOpenings() {
        return this.getPropertyUnformatted('openingTime');
    }

    /* override */
    afterInit() {
        this.addSectionToData("openingTime");
    }
}
