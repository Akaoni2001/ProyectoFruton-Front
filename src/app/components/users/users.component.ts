import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  listUsers: User[]=[];

  constructor(private _userService: UserService){}
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
  eliminarUser(id:any){
    this._userService.delete_user(id).subscribe(data =>{
      this.obtenerUsers();
    },error=>{
      console.log(error);
    })
  }
}
