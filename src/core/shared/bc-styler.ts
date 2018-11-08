import { Input, ElementRef, Renderer2 } from "@angular/core";
import { PropertyResolver } from "./property-resolver";

export class BcStyler {
  /** @hidden */
  private _elementRef: ElementRef;

  /** @hidden */
  private _renderer: Renderer2;

  /** @hidden */
  private _color: string;

  /** @hidden */
  private _element: any = null;

  constructor(elementRef: ElementRef, _renderer2: Renderer2) {
    this._elementRef = elementRef;
    this._renderer = _renderer2;
    this._element =
      this._elementRef != null ? this._elementRef.nativeElement : null;
  }

  /** The color of the navbar. Can be primary, accent, or warn. */
  @Input()
  get color(): string {
    return this._color;
  }

  set color(value: string) {
    const newClassName: string =
      value != null && value !== "" ? `bc-${value}` : null;
    this.updateClass("_color", newClassName);
  }

  public updateClass(propertyName: string, newClass: string) {
    if (propertyName != null && propertyName !== "") {
      let propertyResolved = PropertyResolver.resolve(propertyName, this);
      this._setElementClass(propertyResolved, false);
      this._setElementClass(newClass, true);
      propertyResolved = newClass;
    }
  }

  /** @hidden */
  private _setElementClass(className: string, isAdd: boolean) {
    if (this._element != null && className != null && className !== "") {
      this._renderer =
        this._renderer.constructor.name === "RendererAdapter"
          ? this._renderer["delegate"]
          : this._renderer;
      if (isAdd) {
        this._renderer.addClass(this._element, className);
      } else {
        this._renderer.removeClass(this._element, className);
      }
    }
  }
}
