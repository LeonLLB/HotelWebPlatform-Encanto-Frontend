import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService implements OnInit, OnDestroy {

  DOMClickListener!: (ev:any) => any

  ngOnDestroy(): void {
    this.$eventEmitter.unsubscribe()
    document.removeEventListener('click',this.DOMClickListener)
  }

  ngOnInit(): void {
    this.$eventEmitter.subscribe({
      next:(newItem)=>{
        console.log(newItem)
      }
    })
  }

  activeNavbarItem: string = ''
  closingNavbarItem: string = ''
  lastClosedNavbarItem: string = ''
  $eventEmitter: BehaviorSubject<string> = new BehaviorSubject('')

  changeNavbarItem(newItem: string,shouldEmit:boolean = true){
    if(this.closingNavbarItem !== '') return;
    this.closingNavbarItem = this.activeNavbarItem

    if (newItem !== this.activeNavbarItem) {
      this.activeNavbarItem = newItem
    } else {
      this.activeNavbarItem = ''
    }

    setTimeout(() => {
      this.lastClosedNavbarItem = this.closingNavbarItem;
      this.closingNavbarItem = ''
    }, 350)
    
    if(shouldEmit) this.$eventEmitter.next(this.activeNavbarItem);

  }

  constructor() {
    this.DOMClickListener = (ev) => {
      if(!Object.values(ev.target.classList).includes('navClickableItem')){
        this.$eventEmitter.next('')
      }
    }

    document.addEventListener('click',this.DOMClickListener)
  }

}
