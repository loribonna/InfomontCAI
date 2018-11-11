import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabOpeningsComponent } from './tab-openings.component';

describe('TabOpeningsComponent', () => {
  let component: TabOpeningsComponent;
  let fixture: ComponentFixture<TabOpeningsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabOpeningsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabOpeningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
