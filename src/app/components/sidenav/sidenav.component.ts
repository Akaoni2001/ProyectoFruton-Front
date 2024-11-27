import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {


  listUsers: User[]=[];
  constructor(private _userService: UserService, private tokenService: TokenService, private router: Router){}
  ngOnInit(): void{
    this.obtenerUsers();
    
  }

  obtenerUsers(){
    this._userService.getUsers().subscribe(data=>{
      console.log(data);
      this.listUsers= data;
    }, error=>{
      console.log(error);
    })
  }
  logout() {
    // Llamar al servicio para eliminar el token
    this.tokenService.logout();

    // Redirigir al usuario a la página de login
    this.router.navigate(['/login']);
  }
}
