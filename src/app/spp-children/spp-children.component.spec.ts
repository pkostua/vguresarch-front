import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SppChildrenComponent } from './spp-children.component';

describe('SppChildrenComponent', () => {
  let component: SppChildrenComponent;
  let fixture: ComponentFixture<SppChildrenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SppChildrenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SppChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
