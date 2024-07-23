import { TestBed } from '@angular/core/testing';

import { EstadoCajeroService } from './estado-cajero.service';

describe('EstadoCajeroService', () => {
  let service: EstadoCajeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoCajeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
