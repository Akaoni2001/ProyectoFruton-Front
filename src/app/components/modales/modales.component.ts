import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-modales',
  templateUrl: './modales.component.html',
  styleUrl: './modales.component.css'
})


export class ModalesComponent {
  //atributos
  @Input() imagen!:string;
  @Input() producto!:string;
  @Input() descripcion!:string;
  @Input() categoria!:string;
  @Input() precio!:string;
  @Input() isVisible:boolean = false;
  @Output() close = new EventEmitter<void>();
 
  // iniciador constructor
  //metodos
  closeModal() {
    this.close.emit();
  }


}
