import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarHistoriaClinicaComponent } from './registrar-historia-clinica.component';

describe('RegistrarHistoriaClinicaComponent', () => {
  let component: RegistrarHistoriaClinicaComponent;
  let fixture: ComponentFixture<RegistrarHistoriaClinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarHistoriaClinicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarHistoriaClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
