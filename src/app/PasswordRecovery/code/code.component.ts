import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientServiceService } from '../../ApiServices/client-service.service'; // Import your service

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrl: './code.component.css'
})
export class CodeComponent implements OnInit {
  constructor(private router: Router, private clientService: ClientServiceService) {}
  email: string | null = null; // To store the email from local storage
  otp1: string = '';
  otp2: string = '';
  otp3: string = '';
  otp4: string = '';
  errorMessage: string | null = null; // Variable to hold error messages


  ngOnInit(): void {
    this.email = localStorage.getItem('userEmail'); // Get the email from local storage
  }



  moveToNext(event: Event, index: number) {
    const input = event.target as HTMLInputElement;

    if (input.value.length === 1 && index < 4) {
      const nextInput = document.querySelector(`.otp-input:nth-child(${index + 1})`) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  validateOtp(): void {
    const enteredOtp = this.otp1 + this.otp2 + this.otp3 + this.otp4;
    if (this.email) {
      this.clientService.verifyClientByCode(this.email, parseInt(enteredOtp, 10)).subscribe(
        response => {
          console.log('Code correct!'); // Log success
          this.router.navigate(['/newpassword']); // Redirect to the new password page
        },
        error => {
          this.errorMessage = 'Le code que vous avez entré est incorrect.'; // Set error message in French
          console.log('Code incorrect!'); // Log failure
        }
      );
    } else {
      this.errorMessage = 'L\'adresse e-mail n\'est pas disponible.'; // Handle case if email is not found
    }
  }

  goBack() {
    this.router.navigate(['/login']); // Change this path to your login route
  }


}
