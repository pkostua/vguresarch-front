import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdultFormComponent } from './adult-form.component';

describe('AdultFormComponent', () => {
  let component: AdultFormComponent;
  let fixture: ComponentFixture<AdultFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdultFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdultFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
