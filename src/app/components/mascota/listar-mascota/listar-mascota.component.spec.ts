import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMascotaComponent } from './listar-mascota.component';

describe('ListarMascotaComponent', () => {
  let component: ListarMascotaComponent;
  let fixture: ComponentFixture<ListarMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarMascotaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
