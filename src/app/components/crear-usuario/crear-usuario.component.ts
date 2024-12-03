import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Rol } from 'src/app/models/rol';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.css'
})
export class CrearUsuarioComponent {

  usuarioForm: FormGroup;
  titulo='Crear usuario';
  id:string | null;
  listRol: Rol[] = [];

  constructor(private fb:FormBuilder,
    private router:Router,
    private _userService:UserService,
    private aRouter: ActivatedRoute,
    private _rolService: RolService
  ){this.usuarioForm=this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
  });
  this.id = this.aRouter.snapshot.paramMap.get('id');
}
agregarUsuario() {
  console.log(this.usuarioForm);
  console.log(this.usuarioForm.get('usuario')?.value);

  const USUARIO: User = {
    nombres: this.usuarioForm.get('nombres')?.value,
    apellidos: this.usuarioForm.get('apellidos')?.value,
    email: this.usuarioForm.get('email')?.value,
    password: this.usuarioForm.get('password')?.value,
    role: this.usuarioForm.get('role')?.value,
  }
  console.log(USUARIO);

  if (this.id !== null) {
    // Si hay un id, actualizamos el usuario
    this._userService.editar(this.id, USUARIO).subscribe(
      data => {
        this.router.navigate(['/usuarios']);
      },
      error => {
        console.log(error);
        this.usuarioForm.reset();
      }
    );
  } else {
    // Si no hay id, es una creación de nuevo usuario
    this._userService.registrar(USUARIO).subscribe(
      data => {
        this.router.navigate(['/usuarios']);
      },
      error => {
        console.log(error);
        this.usuarioForm.reset();
      }
    );
  }
}
ngOnInit():void{
  this.esEditar();
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
esEditar(){
  if(this.id !== null){
    this.titulo= 'Editar usuario';
    this._userService.getUserById(this.id).subscribe(data=>{
      this.usuarioForm.setValue({
        nombres: data.nombres,
        apellidos: data.apellidos,
        email: data.email,
        password: data.password,
        role: data.role
      })
 })
  }
}

}
