import { Injectable } from '@angular/core';
import { Loading } from 'notiflix/build/notiflix-loading-aio'

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  displayLoading(message: string,type:'hourglass'|'dots' = 'hourglass'){
    if(type === 'dots'){
      Loading.dots(message,{svgColor:'#EFC501',messageColor:'#EFC501'})
      return
    }
    Loading.hourglass(message,{svgColor:'#EFC501',messageColor:'#EFC501'})
  }

  hideLoading(){
    Loading.remove()
  }

  constructor() { }
}
