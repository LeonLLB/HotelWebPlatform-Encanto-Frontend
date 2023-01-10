import { Component} from '@angular/core';
import { NavbarDataService } from 'src/app/services/navbar-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent {

  constructor(
    public navbarData: NavbarDataService
  ) { }
  

}
