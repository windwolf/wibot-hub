import { TestBed } from '@angular/core/testing';

import { MotorCommService } from './motor.comm.service';

describe('MotorCommService', () => {
  let service: MotorCommService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MotorCommService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
