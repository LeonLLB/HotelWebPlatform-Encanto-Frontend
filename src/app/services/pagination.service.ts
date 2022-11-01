import { Injectable } from '@angular/core';

interface PaginationProps {
  newPage:number,
  paginationRange:number[],
  pages:number
  maxPagesInRange?:number
}

interface PaginateProps {
  page: number | string
  paginationRange: number[]
  maxPagesInPaginationBar: number
  paginas: number
  currentPage: number
}

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor() { }

  paginate({page,paginationRange,maxPagesInPaginationBar,paginas,currentPage}:PaginateProps) {
    let newPage;
    if (typeof page === 'number') {
      newPage = page
    }
    else {
      newPage = (page === 'previous') ? currentPage - 1 : currentPage + 1
    }

    const newPaginationRange = this.calculatePaginationRange({
      newPage,
      paginationRange,
      pages: paginas,
      maxPagesInRange: maxPagesInPaginationBar
    })

    return {newPaginationRange,newPage}

  }

  calculatePaginationRange({newPage,paginationRange,pages,maxPagesInRange=5}:PaginationProps):number[]{

    if(paginationRange.length > maxPagesInRange) throw new Error(`CANTIDAD EQUIVOCADA DE ITEMS, SE ESPERABAN ${maxPagesInRange} PERO SE OBTUVIERON ${paginationRange.length} `)
    
    let newRange: number[] = []
    
    if( (paginationRange.indexOf(newPage) + 1)  > (paginationRange.length / 2) + 1){
      
      // [bottom,...,top]
      const bottomItemOfRange = (paginationRange.includes(pages)) ? paginationRange[0] : paginationRange[0] + 1
      const topItemOfRange = (paginationRange.includes(pages)) ? pages : paginationRange[paginationRange.length-1] + 1;
      
      for(let i = bottomItemOfRange; i <= topItemOfRange; i++){
        newRange.push(i)
      }

      return newRange
    }

    const bottomItemOfRange = (paginationRange.includes(1)) ? paginationRange[0] : paginationRange[0] - 1
    const topItemOfRange = (paginationRange.includes(1)) ? paginationRange[paginationRange.length-1] : paginationRange[paginationRange.length-1] - 1;
      
    for(let i = bottomItemOfRange; i <= topItemOfRange; i++){
      newRange.push(i)
    }

    return newRange

  }



}
