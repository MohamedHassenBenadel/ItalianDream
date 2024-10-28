import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  isSidebarVisible: boolean = true; // Sidebar is visible by default
  isMobile: boolean = false; // Initially set to false

  // Listen for window resize events
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkViewportSize(); // Check viewport size on resize
  }

  constructor(private router: Router) {
    this.checkViewportSize(); // Check viewport size on initialization
  }

  checkViewportSize() {
    this.isMobile = window.innerWidth <= 768; // Set isMobile based on width
    this.isSidebarVisible = !this.isMobile; // Hide sidebar on mobile
  }

  isActiveRoute(route: string): boolean {
   // return this.router.url === route;
   return this.router.url.startsWith(route);
  }

  redirectTo(route: string) {
    this.router.navigate([route]);
  }


}
