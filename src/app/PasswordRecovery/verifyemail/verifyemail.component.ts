import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ClientServiceService } from '../../ApiServices/client-service.service'; 

@Component({
  selector: 'app-verifyemail',
  templateUrl: './verifyemail.component.html',
  styleUrl: './verifyemail.component.css'
})
export class VerifyemailComponent {
  email: string = ''; 
  errorMessage: string | null = null; // Variable to hold error messages

  constructor(
    private location: Location,
    private router: Router,
    private clientService: ClientServiceService, 
  ) {}

  goBack(): void {
    this.location.back();  
  }

  redirectTo(route: string) {
    this.router.navigate([route]);
  }
  verifyEmail() {
    this.clientService.verifyClientByEmail(this.email).subscribe(
      response => {
        localStorage.setItem('userEmail', this.email);
        this.redirectTo('/code');
      },
      error => {
        this.errorMessage = 'L\' adresse e-mail que vous avez entrée n\'existe pas dans notre base de données';
      }
    );
  }
}
