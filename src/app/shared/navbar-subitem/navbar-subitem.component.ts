import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';
import { Options } from '../interfaces/nav-options.interface';

type DropdownStatus = 'opening' | 'open' | 'closing';

@Component({
  selector: 'app-navbar-subitem',
  templateUrl: './navbar-subitem.component.html',
  styles: [
  ]
})
export class NavbarSubitemComponent implements OnInit, OnDestroy {

  @Input() options!: Options[]
  @Input() forLabel!: string

  status: DropdownStatus = 'closing'

  isShowing: boolean = false

  navSubs!: Subscription

  constructor(private navigationService: NavigationService, private router: Router) { }

  onItemClick(ruta:string){
    if(this.status === 'closing') return;
    this.router.navigate([ruta])
    this.navigationService.$eventEmitter.next('')
  }

  ngOnInit(): void {
    this.navSubs = this.navigationService.$eventEmitter.subscribe({
      next:(activeItem)=>{
        const willClose = (
          activeItem !== this.forLabel ||
          activeItem === this.forLabel && this.isShowing
        );
        
        if(willClose){
          this.status = 'closing'
          setTimeout(()=>{
            this.isShowing=false
          },350)
        } else {
          this.isShowing = true
          this.status = 'opening'
          setTimeout(()=>{
            this.status='open'
          },350)
        }

      }
    })
  }

  ngOnDestroy(): void {
    this.navSubs.unsubscribe()
  }


}
