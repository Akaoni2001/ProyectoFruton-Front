import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTipoproductoComponent } from './crear-tipoproducto.component';

describe('CrearTipoproductoComponent', () => {
  let component: CrearTipoproductoComponent;
  let fixture: ComponentFixture<CrearTipoproductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearTipoproductoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearTipoproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
