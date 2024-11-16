import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionProductosComponent } from './recepcion-productos.component';

describe('RecepcionProductosComponent', () => {
  let component: RecepcionProductosComponent;
  let fixture: ComponentFixture<RecepcionProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecepcionProductosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecepcionProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
