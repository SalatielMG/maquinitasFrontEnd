import { TestBed } from '@angular/core/testing';

import { UsuarioSesionService } from './usuario-sesion.service';

describe('UsuarioSesionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsuarioSesionService = TestBed.get(UsuarioSesionService);
    expect(service).toBeTruthy();
  });
});
