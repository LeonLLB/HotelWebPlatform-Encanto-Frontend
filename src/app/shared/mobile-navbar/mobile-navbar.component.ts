import { Component } from '@angular/core';
import { NavbarDataService } from 'src/app/services/navbar-data.service';

@Component({
  selector: 'hwp-mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styles: [
  ]
})
export class MobileNavbarComponent{

  isOpen = false

  constructor(
    public navbarData: NavbarDataService
  ) { }

  toggleNavbar(){
    this.isOpen = !this.isOpen
  }
}
