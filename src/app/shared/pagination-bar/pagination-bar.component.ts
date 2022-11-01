import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination-bar',
  templateUrl: './pagination-bar.component.html',
  styles: [
  ]
})
export class PaginationBarComponent implements OnInit {

  @Input() pagina: number = 1
  @Input() paginas!: number
  @Input() paginationRange!: number[]
  @Output() onPaginate = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  paginate(page: string | number){
    this.onPaginate.emit(page)
  }

}
