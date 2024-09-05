import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isServicesActive = false;

  toggleServices() {
    this.isServicesActive = !this.isServicesActive;
  }


}
