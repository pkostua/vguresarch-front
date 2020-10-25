import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerSelectorComponent } from './owner-selector.component';

describe('OwnerSelectorComponent', () => {
  let component: OwnerSelectorComponent;
  let fixture: ComponentFixture<OwnerSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
