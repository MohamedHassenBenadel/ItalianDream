import { Component } from '@angular/core';
import { ClientServiceService } from '../ApiServices/client-service.service'; 
import { MatSnackBar } from '@angular/material/snack-bar'; 

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
  loading: boolean = false; 

  constructor(private clientService: ClientServiceService, private snackBar: MatSnackBar) {}

  onSubmit(event: Event) {
    event.preventDefault(); 
    this.loading = true;

    
    if (!this.email || !this.tel || !this.subject || !this.message) {
      this.loading = false; 
      this.snackBar.open('Veuillez remplir tous les champs.', 'Fermer', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center' 
      });
      return; 
    }

    this.clientService.sendEmail(this.email, this.tel, this.subject, this.message)
      .subscribe(response => {
        console.log('Email sent successfully:', response);
        this.loading = false; 
        this.snackBar.open('Email envoyé!', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top', 
          horizontalPosition: 'center' 
        });
        
        this.resetForm();
      }, error => {
        console.error('Error sending email:', error);
        this.loading = false;
        this.snackBar.open('Email non envoyé.', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top', 
          horizontalPosition: 'center' 
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
