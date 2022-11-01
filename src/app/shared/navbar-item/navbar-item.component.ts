import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-navbar-item',
  templateUrl: './navbar-item.component.html'
})
export class NavbarItemComponent implements OnInit, OnDestroy {

  @Input() icon!: string
  @Input() label!: string
  navSubs!: Subscription
  active: boolean = false

  constructor(private navigationService: NavigationService) {}

  ngOnDestroy(): void {
    this.navSubs.unsubscribe()
  }

  onItemClick(){
    this.navigationService.changeNavbarItem(this.label)
  }

  ngOnInit(): void {

    this.navSubs = this.navigationService.$eventEmitter
    .subscribe({
      next:(activeItem)=>{
        this.active = this.label === activeItem
        if(activeItem === ''){
          this.navigationService.changeNavbarItem('',false)
        }
      }
    })

  }

}
