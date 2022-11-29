import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination-info',
  templateUrl: './pagination-info.component.html',
  styles: [
  ]
})
export class PaginationInfoComponent implements OnInit {

  @Input() limit!: number
  @Input() pagina!: number
  @Input() items!: number
  @Input() limitName = 'limit'
  @Input() validLimits = [5, 10, 15]
  @Input() message!: string
  @Input() renderLimitSelect = true
  @Output() onLimitChange: EventEmitter<any> = new EventEmitter()


  constructor() { }

  ngOnInit(): void {
  }

  onChange(event: any){
    this.onLimitChange.emit(event)
  }

}
