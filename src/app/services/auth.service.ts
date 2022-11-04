import { Injectable } from '@angular/core';
import { ValidRoles } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _rol: ValidRoles = ValidRoles.null;

  public get rol(): ValidRoles {
    return this._rol;
  }
  public set rol(value: ValidRoles) {
    this._isAuthenticated = value !== ValidRoles.null   
    this._rol = value;
  }

  private _isAuthenticated = false;

  public get isAuthenticated() {
    return this._isAuthenticated;
  }

  constructor() { }


}
