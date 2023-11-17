import { TestBed } from '@angular/core/testing';

import { DetalleHistoriaClinicaService } from './detalle-historia-clinica.service';

describe('DetalleHistoriaClinicaService', () => {
  let service: DetalleHistoriaClinicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleHistoriaClinicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
