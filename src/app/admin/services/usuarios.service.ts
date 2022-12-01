import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MutationResult } from 'apollo-angular';
// import { MutationResult } from '@apollo/client/core';
import { formToJson } from 'src/app/helpers/formToJson.helper';
import { User } from 'src/app/interfaces/user.interface';
import { ConfirmService } from 'src/app/services/confirm.service';
import { GraphqlService } from 'src/app/services/graphql.service';
import { HttpErrorService } from 'src/app/services/http-error.service';
import { LoadingService } from 'src/app/services/loading.service';
import { NotifyService } from 'src/app/services/notify.service';
import { CREATE_USER_MUTATION, DELETE_USER_MUTATION, ICreateUserInput, IUpdateUserInput, IUserInput, UPDATE_USER_MUTATION, UPDATE_USER_PASSWORD_MUTATION } from '../graphql/mutations';
import { GET_USERS_QUERY, GET_USER_QUERY } from '../graphql/queries';

@Injectable()
export class UsuariosService {
  constructor(
    private router: Router,
    private graphql: GraphqlService,
    private confirmService: ConfirmService,
    private notifyService: NotifyService,
    private httpError: HttpErrorService,
    private loading: LoadingService
  ) { }

  createUser(userForm: FormGroup) {
    const formData = formToJson<IUserInput>(userForm,true)
    this.loading.displayLoading('Creando usuario...')
    this.graphql.mutate<{ createUser: User }, ICreateUserInput>(
      CREATE_USER_MUTATION,
      { createUserInput: formData }
    )
      .subscribe(response => {
        this.loading.hideLoading()
        if (response.data?.createUser._id) {
          this.notifyService.success(`Usuario creado con exito, su contraseña es: ${response.data.createUser.password}`, { timeout: 8000 })
          this.router.navigate(['/main', 'admin', 'usuarios'])
          return
        }
        this.httpError.onPostPatchFailure(response)
      })
  }

  updateUser(userForm: FormGroup, userId: string) {
    this.loading.displayLoading('Actualizando...')
    const formData = formToJson<IUserInput>(userForm,true)
    this.graphql.mutate<{ updateUser: User }, IUpdateUserInput>(
      UPDATE_USER_MUTATION,
      { updateUserInput: formData, id: userId }
    )
      .subscribe(response => {
        this.loading.hideLoading()
        if (response.data) {
          this.notifyService.success('Usuario actualizado con exito')
          this.router.navigate(['/main', 'admin', 'usuarios'])
          return
        }
        this.httpError.onPostPatchFailure(response)
      })
  }

  updatePassword(userId: string) {
    this.loading.displayLoading('Cambiando contraseña...')
    this.graphql.mutate<{ updateUserPassword: { password: string } }, { id: string }>(
      UPDATE_USER_PASSWORD_MUTATION,
      { id: userId }
    )
      .subscribe(response => {
        this.loading.hideLoading()
        if (response.data) {
          this.notifyService.success(`Contraseña actualizada para este usuario: ${response.data.updateUserPassword.password}`, { timeout: 8000 })
          return
        }
        this.httpError.onPostPatchFailure(response)
      }
      )
  }

  getUsuario(userId: string, next: (user: any) => void) {
    this.graphql.query<{user:User},{id:string}>(
      GET_USER_QUERY,
      {id:userId}
    ).subscribe(response=>{
      if(response.data){
        next(response.data.user)
        return
      }
      this.router.navigate(['/main', 'admin', 'usuarios'])
    })    
  }

  getUsers(postAction = (data: any) => { }) {
    this.graphql.query<{users:User[]},never>(
      GET_USERS_QUERY
    )
    .subscribe(({data})=>{
      postAction(data.users)
    })    
  }

  deleteUser(user: User, postAction = () => { }) {
    this.confirmService.warning({
      title: `Eliminar usuario: ${user.nombre} ${user.apellido}`,
      message: 'Estas seguro que desea eliminar a este usuario? Esta accion es irreversible. La sesión de este usuario tambien será cerrada',
      okText: 'Eliminar',
      onOk: () => {
        this.loading.displayLoading('Eliminando...')
        this.graphql.mutate<{removeUser:{_id:string}},{id:string}>(
          DELETE_USER_MUTATION,
          {id:user._id!}
        ).subscribe(response=>{
          this.loading.hideLoading()
          if(response.data){
            this.notifyService.success('Usuario eliminado con exito')
            postAction()
            return
          }
          this.httpError.onPostPatchFailure(response)
        })        
      }
    })

  }
}
