import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByMemberComponent } from './by-member.component';

describe('ByMemberComponent', () => {
  let component: ByMemberComponent;
  let fixture: ComponentFixture<ByMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ByMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ByMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
