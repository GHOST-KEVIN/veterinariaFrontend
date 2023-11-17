import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarDetallesComponent } from './listar-detalles.component';

describe('ListarDetallesComponent', () => {
  let component: ListarDetallesComponent;
  let fixture: ComponentFixture<ListarDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarDetallesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
