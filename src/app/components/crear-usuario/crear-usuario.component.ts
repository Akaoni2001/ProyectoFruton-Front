import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.css'
})
export class CrearUsuarioComponent {

  usuarioForm: FormGroup;
  titulo='Crear usuario';
  id:string | null;

  constructor(private fb:FormBuilder,
    private router:Router,
    private _userService:UserService,
    private aRouter: ActivatedRoute
  ){this.usuarioForm=this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
  });
  this.id = this.aRouter.snapshot.paramMap.get('id');
}
agregarUsuario(){
  console.log(this.usuarioForm);
  console.log(this.usuarioForm.get('usuario')?.value);

  const USUARIO: User = {
    nombres:this.usuarioForm.get('nombres')?.value,
    apellidos:this.usuarioForm.get('apellidos')?.value,
    email:this.usuarioForm.get('email')?.value,
    password:this.usuarioForm.get('password')?.value,
    role:this.usuarioForm.get('role')?.value,
  }
  console.log(USUARIO);
        this._userService.registrar(USUARIO).subscribe(data=>{
        this.router.navigate(['/usuarios']);
        },error=>{
          console.log(error);
          this.usuarioForm.reset();
        })

}

}
