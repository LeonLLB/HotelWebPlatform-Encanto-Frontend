import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-table-crud',
  templateUrl: './table-crud.component.html',
  styles: [
  ]
})
export class TableCrudComponent implements OnInit {

  @Input() labels!: TemplateRef<any>
  @Input() row!: TemplateRef<any>
  @Input() extraOptions!: TemplateRef<any>
  @Input() roundedTop = true
  @Input() items!: any[]
  @Input() updateRouterLink!: string[]
  @Input() showDefaultOptions: {edit:boolean,del:boolean} = {edit:true,del:true}
  @Output() onDeleteClick: EventEmitter<any> = new EventEmitter()
  @Output() onUpdateClick: EventEmitter<any> = new EventEmitter()

  constructor() {
  }

  ngOnInit(): void {
  }

  onDeleteButton(item: any){
    this.onDeleteClick.emit(item)
  } 

  onUpdateButton(item: any){
    this.onUpdateClick.emit(item)
  } 

  getRouterLink(itemId: string | number){
    if(!this.updateRouterLink){
      return undefined
    }
    return [...this.updateRouterLink,itemId]
  }

  get shouldRenderOptions():boolean{
    return (
      (this.showDefaultOptions.edit && this.showDefaultOptions.del ) ||
      !!this.extraOptions
    )
  }

}
