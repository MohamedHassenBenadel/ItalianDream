import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isServicesActive = false; // Controls dropdown for Services
  currentRoute: string = ''; // Track current active route
  isMenuOpen = false; // Controls the mobile menu visibility

  constructor(private router: Router, private route: ActivatedRoute) {
    // Update currentRoute when navigation ends
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentRoute = this.router.url;
      this.isMenuOpen = false; // Close the mobile menu when route changes
    });
  }

  // Check if the current route matches the button route
  isActive(route: string): boolean {
    return this.currentRoute === route;
  }

  // Toggle dropdown for Services button
  toggleServices() {
    this.isServicesActive = !this.isServicesActive;
  }

  // Redirect to a given route
  redirectTo(route: string) {
    this.router.navigate([route]);
  }

  // Toggle the mobile menu visibility
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
