import { Directive, ElementRef, Input } from '@angular/core';
import { BlockService } from 'src/app/services/block.service';

@Directive({
  selector: '[Block]'
})
export class BlockableDirective {  

  @Input('Block') set blockStatus(condicion: boolean | null){
    if(condicion){
      this.blockService.block([this.htmlElement.nativeElement])
    }else{
      this.blockService.unBlock([this.htmlElement.nativeElement])
    }
  }

  constructor(
    private htmlElement: ElementRef<HTMLElement>,
    private blockService: BlockService
  ) { }

  ngOnInit(): void {}

}
