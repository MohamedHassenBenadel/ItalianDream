import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientServiceService } from '../../ApiServices/client-service.service';


@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrl: './newpassword.component.css'
})
export class NewpasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  email: string | null = localStorage.getItem('userEmail'); // Get the email from local storage


  constructor(private router: Router, private snackBar: MatSnackBar, private clientService: ClientServiceService) {}

  // Method to handle the form submission
  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Call the reset password service method
    this.clientService.resetPassword(this.email!, this.newPassword).subscribe(
      response => {
        // Show success notification
        this.snackBar.open('Mot de passe modifié avec succès!', 'Fermer', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    );
  }

  redirectTo(route: string) {
    this.router.navigate([route]);
  }


}
