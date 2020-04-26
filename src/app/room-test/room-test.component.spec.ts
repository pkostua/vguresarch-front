import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomTestComponent } from './room-test.component';

describe('RoomTestComponent', () => {
  let component: RoomTestComponent;
  let fixture: ComponentFixture<RoomTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
