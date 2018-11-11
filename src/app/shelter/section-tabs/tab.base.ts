import { OnInit } from "@angular/core";
import { CacheService } from "../../cache.service";
import { ActivatedRoute } from "@angular/router";

export abstract class TabItemBase implements OnInit {
  _data: any;
  _section: string;
  constructor(
    protected route: ActivatedRoute,
    protected cache: CacheService
  ) {}

  initData() {
    const cacheSub = this.cache
      .loadShelterSection(this._section)
      .subscribe(data => {
        this._data = data;
        if (cacheSub) {
          cacheSub.unsubscribe();
        }
      });
  }

  ngOnInit() {
    const sub = this.route.data.subscribe((d: any) => {
      this._section = d.section;
      this.initData();
      if (sub) {
        sub.unsubscribe();
      }
    });
  }

  showData() {
    return JSON.stringify(this._data);
  }
}
