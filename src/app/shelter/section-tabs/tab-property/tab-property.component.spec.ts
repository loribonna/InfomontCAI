import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPropertyComponent } from './tab-property.component';

describe('TabPropertyComponent', () => {
  let component: TabPropertyComponent;
  let fixture: ComponentFixture<TabPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
