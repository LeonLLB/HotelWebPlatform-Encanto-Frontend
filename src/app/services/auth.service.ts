import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _rol: 'A' | '' | 'R' = '';

  public get rol(): 'A' | '' | 'R' {
    return this._rol;
  }
  public set rol(value: 'A' | '' | 'R') {
    this._isAuthenticated = value !== ''   
    this._rol = value;
  }

  private _isAuthenticated = false;

  public get isAuthenticated() {
    return this._isAuthenticated;
  }

  constructor() { }


}
