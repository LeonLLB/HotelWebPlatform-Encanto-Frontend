import { Injectable } from '@angular/core';
import { Block, IBlockOptions } from 'notiflix/build/notiflix-block-aio';

@Injectable({
  providedIn: 'root'
})
export class BlockService {

  private defaultOptions : IBlockOptions = {
    backgroundColor: '#E0E0E0',    
  }

  block(blockElement: string | HTMLElement[] = '.blockable',textMessage = 'Cargando...'){
    Block.hourglass(blockElement,textMessage,this.defaultOptions)
  }

  unBlock(blockElement: string | HTMLElement[] = '.blockable'){
    Block.remove(blockElement)
  }

  constructor() { }

}
