import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  
  listCategoria: Categoria[] = [];
  categoriaForm: FormGroup;

  constructor(
    private _categoriaServices: CategoriaService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.categoriaForm = this.fb.group({
      nombreCategoria: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  obtenerCategorias() {
    this._categoriaServices.getCategorias().subscribe(
      data => {
        console.log(data);
        this.listCategoria = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  agregarCategoria() {
    if (this.categoriaForm.valid) {
      const nombreCategoria = this.categoriaForm.get('nombreCategoria')?.value;

      const nuevaCategoria: Categoria = {
        nombreCategoria,
        fechaCreacion: new Date()
      };

      this._categoriaServices.guardarCategoria(nuevaCategoria).subscribe(
        data => {
          this.listCategoria.push(data); // Agregar la nueva categoría a la lista
          this.categoriaForm.reset(); // Reiniciar el formulario
        },
        error => {
          console.error('Error al agregar categoría:', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }

  eliminarCategoria(id: any) {
    this._categoriaServices.eliminarCategoria(id).subscribe(
      () => {
        this.listCategoria = this.listCategoria.filter(categoria => categoria._id !== id); // Filtrar la categoría eliminada de la lista
      },
      error => {
        this.mostrarError("Hay productos en la categoría", "Accion inválida");
        console.error('Error al eliminar categoría:', error);
      }
    );
  }

  mostrarError(mensaje:string, Titulo:string) {
    this.toastr.error(mensaje, Titulo,
      {positionClass : "toast-top-right",}
   );
  }

}
