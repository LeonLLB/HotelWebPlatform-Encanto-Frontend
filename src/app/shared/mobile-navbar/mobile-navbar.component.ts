import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavbarDataService } from 'src/app/services/navbar-data.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'hwp-mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styles: [
  ]
})
export class MobileNavbarComponent implements OnInit, OnDestroy{

  isOpen = false
  isClosing = false
  hasOpened = false

  navStatusSub!: Subscription

  constructor(
    public navbarData: NavbarDataService,
    private navService: NavigationService
  ) { }  

  ngOnInit(): void {
    this.navStatusSub = this.navService.$eventEmitter.subscribe({
      next:(activeItem)=>{
        if(activeItem === '' && this.hasOpened){
          this.isClosing=true
          setTimeout(()=>{
            this.isClosing=false    
            this.isOpen = false
            setTimeout(()=>{this.hasOpened = false},50)
          },350)
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.navStatusSub.unsubscribe()
  }

  toggleNavbar(){    
    if(this.isOpen){
      this.isClosing = true
      setTimeout(()=>{this.hasOpened = false},50)
      setTimeout(()=>{this.isOpen = false;this.isClosing=false},350)
      return      
    }
    this.isClosing = false
    this.isOpen = !this.isOpen
    setTimeout(()=>{this.hasOpened = this.isOpen},350)
  }
}
