import { TestBed, async, inject } from '@angular/core/testing';

import { IsCajaOpenGuard } from './is-caja-open.guard';

describe('IsCajaOpenGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsCajaOpenGuard]
    });
  });

  it('should ...', inject([IsCajaOpenGuard], (guard: IsCajaOpenGuard) => {
    expect(guard).toBeTruthy();
  }));
});
