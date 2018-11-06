import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsBaseComponent } from './tabs-base.component';

describe('TabsBaseComponent', () => {
  let component: TabsBaseComponent;
  let fixture: ComponentFixture<TabsBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
