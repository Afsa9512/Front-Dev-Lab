import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarFacturaComponent } from './listar-factura.component';

describe('ListarFacturaComponent', () => {
  let component: ListarFacturaComponent;
  let fixture: ComponentFixture<ListarFacturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarFacturaComponent]
    });
    fixture = TestBed.createComponent(ListarFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
