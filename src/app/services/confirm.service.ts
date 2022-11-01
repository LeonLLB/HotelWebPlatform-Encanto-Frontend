import { Injectable } from '@angular/core';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';

interface ConfirmProps{
  title:string,
  message:string,
  okText:string,
  cancelText?:string,
  promptDefaultText?: string
  onOk?:()=>void,
  onCancel?:()=>void,
  onPrompt?:(prompt:string)=>void,
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  private defaultOptions = {
    width:'30rem',
    messageMaxLength:999,
    okButtonColor:"#fff",
  }

  warning({title,message,okText,cancelText = 'Cancelar',onOk,onCancel}:ConfirmProps){
    Confirm.show(title,message,okText,cancelText,onOk,onCancel,{      
      ...this.defaultOptions,
      titleColor:'#eebf31',
      okButtonBackground:'#eebf31',      
      backOverlayColor:'rgba(238,191,49,0.2)'
    })
  }

  danger({title,message,okText,cancelText = 'Cancelar',onOk,onCancel}:ConfirmProps){
    Confirm.show(title,message,okText,cancelText,onOk,onCancel,{
      ...this.defaultOptions,
      titleColor:'#ff5549',
      okButtonBackground:'#ff5549',
      backOverlayColor:'rgba(255,85,73,0.2)'
    })
  }

  prompt({title,message,okText,cancelText = 'Cancelar',onPrompt,promptDefaultText = ''}:ConfirmProps){
    Confirm.prompt(title,message,promptDefaultText,okText,cancelText,onPrompt,undefined,{
      ...this.defaultOptions,
      titleColor:'#1e1e1e',
      okButtonBackground:'#26c0d3',
      backOverlayColor:'rgba(38,192,211,0.2)'
    })
  }

  constructor() {}
}
