import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabServicesComponent } from './tab-services.component';

describe('TabServicesComponent', () => {
  let component: TabServicesComponent;
  let fixture: ComponentFixture<TabServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
