import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ItalianDream';

  showNavbar = false;
  showSidebar = false;
  showFooter = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const routeData = this.router.routerState.snapshot.root.firstChild?.data as { [key: string]: boolean | undefined };

        this.showNavbar = routeData['showNavbar'] ?? false;
        this.showSidebar = routeData['showSidebar'] ?? false;
        this.showFooter = routeData['showFooter'] ?? false;
      }
    });
  }
}
