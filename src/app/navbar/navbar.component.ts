import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent { 
  
isServicesActive = false;
currentRoute: string = '';


constructor(private router: Router, private route: ActivatedRoute) {
  this.router.events.pipe(
    filter(event => event instanceof NavigationEnd)
  ).subscribe(() => {
    this.currentRoute = this.router.url;
  });
}

isActive(route: string): boolean {
  return this.currentRoute === route;
}


  toggleServices() {
    this.isServicesActive = !this.isServicesActive;
  }

  redirectTo(route: string) {
    this.router.navigate([route]);
  }
  


}
