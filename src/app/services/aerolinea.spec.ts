import { TestBed } from '@angular/core/testing';

import { Aerolinea } from './aerolinea';

describe('Aerolinea', () => {
  let service: Aerolinea;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Aerolinea);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
