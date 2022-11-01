import { Injectable } from '@angular/core';
import {INotifyOptions} from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  failure(message: string, options?: INotifyOptions){
    Notify.failure(message,options)
  }

  success(message: string, options?: INotifyOptions){
    Notify.success(message,options)
  }

  constructor() {
    Notify.init({
      position:'center-top',
      fontSize:'16px',
      width:'20rem',
        failure:{
          background:'#ffffff',
          textColor:'#ff5549',
          notiflixIconColor:'#ff5549',
        },
        success:{
          background:'#ffffff',
          textColor:'#32c682',
          notiflixIconColor:'#32c682',
        }
    })
   }
}
