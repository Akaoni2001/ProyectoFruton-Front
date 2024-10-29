import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rol } from 'src/app/models/rol';
import { RolService } from 'src/app/services/rol.service';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {

  listRol: Rol[] = [];
  rolForm: FormGroup;

  constructor(
    private _rolService: RolService,
    private fb: FormBuilder,
  ) {
    this.rolForm = this.fb.group({
      nombreCategoria: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.obtenerRoles();
  }

  obtenerRoles() {
    this._rolService.getRoles().subscribe(
      data => {
        console.log(data);
        this.listRol = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  agregarRol() {
    if (this.rolForm.valid) {
      const nombreRol = this.rolForm.get('nombreCategoria')?.value;

      const nuevRol: Rol = {
        nombreRol,
        fechaCreacion: new Date()
      };

      this._rolService.guardarRol(nuevRol).subscribe(
        data => {
          this.listRol.push(data); // Agregar la nueva categoría a la lista
          this.rolForm.reset(); // Reiniciar el formulario
        },
        error => {
          console.error('Error al agregar categoría:', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }

  eliminarRol(id: any) {
    this._rolService.eliminarRol(id).subscribe(
      () => {
        this.listRol = this.listRol.filter(rol => rol._id !== id); // Filtrar la categoría eliminada de la lista
      },
      error => {
        console.error('Error al eliminar categoría:', error);
      }
    );
  }

}
