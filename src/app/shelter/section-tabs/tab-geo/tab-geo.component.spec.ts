import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabGeoComponent } from './tab-geo.component';

describe('TabGeoComponent', () => {
  let component: TabGeoComponent;
  let fixture: ComponentFixture<TabGeoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabGeoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabGeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
