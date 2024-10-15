import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrl: './newpassword.component.css'
})
export class NewpasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private router : Router){}

  // Method to handle the form submission
  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Perform the logic you need here (e.g., call a service to update the password)
    console.log('New Password:', this.newPassword);
    this.router.navigate(['/login']);
  }

  redirectTo(route: string) {
    this.router.navigate([route]);
  }


}
