import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _instance: any

  public set state(state:  any){
    this._instance = state
  }

  public get state() {
    return this._instance
  }

  constructor() { }
}
