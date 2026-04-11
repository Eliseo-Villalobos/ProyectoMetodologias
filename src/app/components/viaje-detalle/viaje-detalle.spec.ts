import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajeDetalle } from './viaje-detalle';

describe('ViajeDetalle', () => {
  let component: ViajeDetalle;
  let fixture: ComponentFixture<ViajeDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViajeDetalle],
    }).compileComponents();

    fixture = TestBed.createComponent(ViajeDetalle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
