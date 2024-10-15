import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrl: './code.component.css'
})
export class CodeComponent {
  constructor(private router : Router){}
  otp1: string = '';
  otp2: string = '';
  otp3: string = '';
  otp4: string = '';

  private correctOtp: string = '1234'; // Example code, change as needed

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
    if (enteredOtp === this.correctOtp) {
      console.log('Code correct!'); // Log success
      this.router.navigate(['/newpassword']);
    } else {
      console.log('Code incorrect!'); // Log failure
    }
  }

  goBack() {
    this.router.navigate(['/login']); // Change this path to your login route
  }


}
