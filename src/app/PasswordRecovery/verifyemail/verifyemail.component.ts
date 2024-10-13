import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-verifyemail',
  templateUrl: './verifyemail.component.html',
  styleUrl: './verifyemail.component.css'
})
export class VerifyemailComponent {
  email: string = ''; // Variable to hold email input

  constructor(private location: Location , private router : Router) {}

  goBack(): void {
    this.location.back();  // This will navigate to the previous page
  }

  redirectTo(route: string) {
    this.router.navigate([route]);
  }



}
