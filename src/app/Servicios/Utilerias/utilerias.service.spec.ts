import { TestBed } from '@angular/core/testing';

import { UtileriasService } from './utilerias.service';

describe('UtileriasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UtileriasService = TestBed.get(UtileriasService);
    expect(service).toBeTruthy();
  });
});
