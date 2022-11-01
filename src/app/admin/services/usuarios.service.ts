import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { formToJson } from 'src/app/helpers/formToJson.helper';
import { User } from 'src/app/interfaces/user.interface';
import { ConfirmService } from 'src/app/services/confirm.service';
import { LoadingService } from 'src/app/services/loading.service';
import { NotifyService } from 'src/app/services/notify.service';

@Injectable()
export class UsuariosService {
  //TODO: CAMBIAR A GRAPHQL
  constructor(
    private router: Router,
    private http: HttpClient,
    private confirmService: ConfirmService,
    private notifyService: NotifyService,
    private loading: LoadingService
  ) { }

  private onPostPatchFailure(err: any){
    if(err.error.message[0]?.includes('3')){
      this.notifyService.failure('Tanto el nombre como el apellido deben tener más de 3 caracteres')
      return;
    }
    if(typeof err.error.message === 'string' && err.error.statusCode < 500){
      this.notifyService.failure(err.error.message)
      return
    }
    this.notifyService.failure('Ocurrio un error, por favor contacte al administrador de sistemas')
  }

  createUser(userForm: FormGroup){
    this.confirmService.warning({
      title:'Registrar usuario',
      message:'Estas seguro que desea registrar a este usuario? Todos los usuarios son administradores y por lo tanto tienen acceso a todo el sistema.',
      okText:'Registrar',
      onOk:()=>{ 
        this.loading.displayLoading('Registrando...')
        this.http.post<any>('$/users',{...formToJson(userForm)})
        .subscribe(
          {
            next:(data)=>{
              this.notifyService.success(`Usuario creado con exito, su contraseña es: ${data.password}`,{timeout:8000})
              this.router.navigate(['/main','admin','usuarios'])
              this.loading.hideLoading()
            },
            error:(err)=>{this.onPostPatchFailure(err);this.loading.hideLoading()}
          }      
        )        
      }
    })
  }

  updateUser(userForm: FormGroup, userId: number){
    this.loading.displayLoading('Actualizando...')
    this.http.patch<any>('$/users/'+userId,{...formToJson(userForm)})
    .subscribe(
      {
        next:(data)=>{
          this.notifyService.success('Usuario actualizado con exito')
          this.router.navigate(['/main','admin','usuarios'])
          this.loading.hideLoading()
        },
        error:(err)=>{this.onPostPatchFailure(err);this.loading.hideLoading()}
      }      
    )
  }

  updatePassword(userId: number){
    this.loading.displayLoading('Cambiando contraseña...')
    this.http.patch<any>('$/users/password/'+userId,{})
    .subscribe(
      {
        next:(data)=>{
          this.notifyService.success(`Contraseña actualizada para este usuario: ${data.newPassword}`,{timeout:8000})     
          this.loading.hideLoading()     
        },
        error:(err)=>{this.onPostPatchFailure(err);this.loading.hideLoading()}
      }      
    )
  }

  getUsuario(userId: number,next: (user: any)=>void){
    this.http.get<any>(`$/users/${userId}`)
    .subscribe({
      next,
      error:(err)=>{
        this.router.navigate(['/main','admin','usuarios'])
      }
    })
  }

  getUsers(postAction = (data: any)=>{}){
    this.http.get<User[]>('$/users').subscribe({
      next:postAction
    })
  }

  deleteUser(user: User,postAction = ()=>{}){
    this.confirmService.warning({
      title:`Eliminar usuario: ${user.nombre} ${user.apellido}`,
      message:'Estas seguro que desea eliminar a este usuario? Esta accion es irreversible. La sesión de este usuario tambien será cerrada',
      okText:'Eliminar',
      onOk:()=>{ 
        this.loading.displayLoading('Eliminando...')
        this.http.delete<any>('$/users/'+user.id,{})
        .subscribe(
          {
            next:(data)=>{
              this.notifyService.success('Usuario eliminado con exito')
              this.loading.hideLoading()
              postAction()
            },
            error:(err)=>{this.onPostPatchFailure(err);this.loading.hideLoading()}
          }      
        )        
      }
    })
    
  }
}
