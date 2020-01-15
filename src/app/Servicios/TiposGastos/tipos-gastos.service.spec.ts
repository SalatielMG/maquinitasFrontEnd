import { TestBed } from '@angular/core/testing';

import { TiposGastosService } from './tipos-gastos.service';

describe('TiposGastosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TiposGastosService = TestBed.get(TiposGastosService);
    expect(service).toBeTruthy();
  });
});
