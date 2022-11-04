import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidRoles } from 'src/app/interfaces/user.interface';
import { ConfirmService } from 'src/app/services/confirm.service';
import { NotifyService } from 'src/app/services/notify.service';
import { ValidatorService } from 'src/app/services/validator.service';
import { environment } from 'src/environments/environment';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar.component.html',
  styles: [
  ]
})
export class RegistrarComponent implements OnInit {

  private unvalidInputs = [
    '_id',
    '__typename',
    'password'
  ]

  isEditableForm = false
  userId!: string

  userForm = this.fb.group({
    nombre:['',[Validators.required]],
    apellido:['',[Validators.required]],
    cedula:[null,[Validators.required,Validators.min(1),this.validatorService.maxNumericLength(9,true),this.validatorService.numeric]],
    cargo:['',[Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UsuariosService,
    private validatorService: ValidatorService
  ) { }

  cargosValidos = [
    {value: ValidRoles.admin, label: 'Administrador'},
    {value: ValidRoles.recepcionista, label: 'Recepcionista'},
  ]

  ngOnInit(): void {
    this.route.params
    .subscribe(data=>{
      if(data['id']){
        this.isEditableForm = true

        this.userService.getUsuario(data['id'],(user)=>{
          this.userId = user.id
          let newForm: {[x:string]:any} = {}

          for(let userMap of Object.entries(user)){
            if(this.unvalidInputs.includes(userMap[0])) continue;
            newForm[userMap[0]] = userMap[1]
          }
          
          this.userForm.setValue(newForm as any)
        })
      }
    })
  } 

  registerUserSubmit(){
    if(this.userForm.invalid){
      this.userForm.markAllAsTouched()
      return;
    }

    if(this.isEditableForm){
      this.userService.updateUser(this.userForm, this.userId)
      return
    }

    this.userService.createUser(this.userForm)

  }

  cambiarClave(){
    this.userService.updatePassword(this.userId)
  }

}
