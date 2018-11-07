import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterComponent, TABS } from './shelter.component';

describe('ShelterComponent', () => {
  let component: ShelterComponent;
  let fixture: ComponentFixture<ShelterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShelterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



describe('App-Component Routing', () => {
  it('should have unique tabs link', () => {
    const obj = {};
    TABS.forEach(tab => {
      const id = tab.link;
      if (!obj[id]) {
        obj[id] = 0;
      }
      obj[id] += 1;
    });

    for (const prop in obj) {
      expect(obj[prop]).toBeLessThan(2);
    }
  });

  it('should have unique tabs section target', () => {
    const obj = {};
    TABS.forEach(tab => {
      const id = tab.section;
      if (!obj[id]) {
        obj[id] = 0;
      }
      obj[id] += 1;
    });

    for (const prop in obj) {
      expect(obj[prop]).toBeLessThan(2);
    }
  });

  it('should have only one default tab', () => {
    const count = TABS.filter(tab => tab.default).length;
    expect(count).toEqual(1);
  });
});
