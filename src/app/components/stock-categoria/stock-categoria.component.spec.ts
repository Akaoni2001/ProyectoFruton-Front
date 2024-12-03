import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCategoriaComponent } from './stock-categoria.component';

describe('StockCategoriaComponent', () => {
  let component: StockCategoriaComponent;
  let fixture: ComponentFixture<StockCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockCategoriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
