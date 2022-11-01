import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-mgac-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {

  usuarios: User[] = []
  isLoading = true

  constructor(
    private userService: UsuariosService,
  ) { }

  ngOnInit(): void {
    this.getUsuarios()
  }

  getUsuarios(){
    this.isLoading = true
    this.userService.getUsers((data)=>{
      this.usuarios = data
      this.isLoading = false
    })
  }

  deleteUser(data: any){
    this.userService.deleteUser(data,()=>{
      this.getUsuarios()
    })
  }

}
