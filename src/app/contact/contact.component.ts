import { Component } from '@angular/core';
import { ClientServiceService } from '../ApiServices/client-service.service'; 
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  email: string = '';
  tel: string = '';
  subject: string = '';
  message: string = '';
  loading: boolean = false; // Loading state

  constructor(private clientService: ClientServiceService, private snackBar: MatSnackBar) {}

  onSubmit(event: Event) {
    event.preventDefault(); // Prevent default form submission
    this.loading = true; // Start loading

    // Check if all fields are filled
    if (!this.email || !this.tel || !this.subject || !this.message) {
      this.loading = false; // Stop loading if fields are empty
      this.snackBar.open('Veuillez remplir tous les champs.', 'Fermer', {
        duration: 3000,
        verticalPosition: 'top', // Set vertical position to top
        horizontalPosition: 'center' // Set horizontal position to center
      });
      return; // Exit the method if validation fails
    }

    this.clientService.sendEmail(this.email, this.tel, this.subject, this.message)
      .subscribe(response => {
        console.log('Email sent successfully:', response);
        this.loading = false; // Stop loading
        this.snackBar.open('Email envoyé!', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top', // Set vertical position to top
          horizontalPosition: 'center' // Set horizontal position to center
        });
        
        // Reset the form fields
        this.resetForm();
      }, error => {
        console.error('Error sending email:', error);
        this.loading = false; // Stop loading
        this.snackBar.open('Email non envoyé.', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top', // Set vertical position to top
          horizontalPosition: 'center' // Set horizontal position to center
        });
      });
  }

  resetForm() {
    this.email = '';
    this.tel = '';
    this.subject = '';
    this.message = '';
  }
}
