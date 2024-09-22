import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private router: Router) {}

  isActiveRoute(route: string): boolean {
   // return this.router.url === route;
   return this.router.url.startsWith(route);
  }

  redirectTo(route: string) {
    this.router.navigate([route]);
  }


}
