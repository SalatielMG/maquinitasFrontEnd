import { TestBed, async, inject } from '@angular/core/testing';

import { IsSessionActiveGuard } from './is-session-active.guard';

describe('IsSessionActiveGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsSessionActiveGuard]
    });
  });

  it('should ...', inject([IsSessionActiveGuard], (guard: IsSessionActiveGuard) => {
    expect(guard).toBeTruthy();
  }));
});
