import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { GraphqlService } from 'src/app/services/graphql.service';
import { LoadingService } from 'src/app/services/loading.service';
import { NotifyService } from 'src/app/services/notify.service';
import { ValidatorService } from 'src/app/services/validator.service';
import { environment } from 'src/environments/environment';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    // private http: HttpClient,
    private Graphql: GraphqlService,
    private notifyService: NotifyService,
    private routerService: Router,
    private loading: LoadingService
  ) { }

  loginForm: FormGroup = this.fb.group({
    cedula: [null, [Validators.required, Validators.min(1), this.validatorService.maxNumericLength(9, true), this.validatorService.numeric]],
    password: ['', [Validators.required]]
  })

  esValido(campo: string): boolean | null {
    return (this.loginForm.controls[campo].errors && this.loginForm.controls[campo].touched)
  }

  getErrorMsg(campo: string): string | null {
    return this.validatorService.getErrorsMSG(this.loginForm.controls[campo].errors)
  }

  loginSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
      return;
    }

    // this.loading.displayLoading('Iniciando sesión...')
    this.Graphql.query(
      `
        query LoginUser($loginInputData: LoginInput!){
          login(loginInput:$loginInputData){
            _id
            nombre
            apellido
            cargo
            token
          }
        }
      `,
      {
        loginInputData: {
          cedula: parseInt(this.loginForm.value.cedula),
          password: this.loginForm.value.password
        }
      }
    ).subscribe((response) => {
      this.loading.hideLoading()
      console.log(response)
      // this.notifyService.success(`Sesión iniciada para: ${data.nombre} ${data.apellido}`)
      // this.routerService.navigate(['main'])
    })
    // this.http.post<User>('$/users/login',{
    //   cedula: parseInt(this.loginForm.controls['cedula'].value),
    //   password: this.loginForm.controls['password'].value,
    // })
    // .subscribe(
    //   {

    //   }      
    // )


  }

}
