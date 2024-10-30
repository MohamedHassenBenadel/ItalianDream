import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ClientServiceService } from '../../ApiServices/client-service.service'; 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  @ViewChild('ChangePasswordDialog') changePasswordDialog!: TemplateRef<any>;

  passwordForm: FormGroup;
  clientData: any = {}; 


  constructor(private fb: FormBuilder, private dialog: MatDialog, private clientService: ClientServiceService) {
    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }
  
  ngOnInit(): void {
    this.loadClientData(); // Load client data when component initializes
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('newPassword')?.value === formGroup.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  openPasswordChangeModal() {
    this.dialog.open(this.changePasswordDialog, {
      width: '400px'
    });
  }

  submitNewPassword() {
    if (this.passwordForm.valid) {
      const clientId = this.clientData.clientId; // Get the client ID from clientData
      const newPassword = this.passwordForm.value.newPassword; // Get the new password from the form

      this.clientService.changePassword(clientId, newPassword).subscribe(
        response => {
          console.log('Password changed successfully', response);
          this.dialog.closeAll(); // Close the modal after successful submission
          // Optionally, show a success message to the user
        },
        error => {
          console.error('Error changing password', error);
          // Optionally, show an error message to the user
        }
      );
    }
  }
  loadClientData() {
    const clientData = localStorage.getItem('client'); // Get the client data from local storage
    if (clientData) {
      this.clientData = JSON.parse(clientData); // Parse the stored JSON string
      console.log(this.clientData); // Log client data for debugging
    }
  }

}
