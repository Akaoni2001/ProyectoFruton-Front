import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRecepcionproductosComponent } from './crear-recepcionproductos.component';

describe('CrearRecepcionproductosComponent', () => {
  let component: CrearRecepcionproductosComponent;
  let fixture: ComponentFixture<CrearRecepcionproductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearRecepcionproductosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearRecepcionproductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
