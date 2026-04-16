import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilHeader } from './perfil-header';

describe('PerfilHeader', () => {
  let component: PerfilHeader;
  let fixture: ComponentFixture<PerfilHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
