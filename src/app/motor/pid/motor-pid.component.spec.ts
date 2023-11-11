import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorPidComponent } from './motor-pid.component';

describe('MotorPidComponent', () => {
  let component: MotorPidComponent;
  let fixture: ComponentFixture<MotorPidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotorPidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotorPidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
