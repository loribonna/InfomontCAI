import {
    Component,
    Input,
    ViewEncapsulation,
    ElementRef,
    Renderer2,
    Directive
} from '@angular/core';

import { BcStyler } from '../shared/bc-styler';

@Directive({
    selector: "[appUncheck]",
    host: {
        '[class.uncheck]' : 'appUncheck'
    }
})
export class UncheckIconDirective {
    @Input() appUncheck = false;
}
@Component({
    selector: 'bc-icon',
    template: '',
    styleUrls: ['icon.component.scss'],
    host: {
        '[class.bc-icon]': 'true',
        '[class.fa]': 'true',
        'role': 'img'
    },
    encapsulation: ViewEncapsulation.None
})
export class BcIconComponent extends BcStyler {
    private _name: string;
    private _size: string;
    private _style: string;

    constructor(elementRef: ElementRef, _renderer2: Renderer2) {
        super(elementRef, _renderer2);
    }

    /** The name of the icon.*/
    @Input()
    get name(): string {
        return this._name;
    }

    set name(value: string) {
        const newClassName: string = (value != null && value !== '') ? `fa-${value}` : null;
        this.updateClass("_name", newClassName);
    }

    /** The size of the icon. Can be xs, s, m, l, or xl. */
    @Input()
    get size(): string {
        return this._size;
    }

    set size(value: string) {
        const newClassName: string = (value != null && value !== '') ? `bc-icon-${value}` : null;
        this.updateClass("_size", newClassName);
    }
}
