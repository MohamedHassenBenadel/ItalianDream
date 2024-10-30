import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AdminServiceService } from '../../ApiServices/admin-service.service';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.css']
})
export class AddclientComponent implements OnInit {

  clientForm: FormGroup;
  errorMessage: string | null = null; // Add a property to hold the error message

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private adminService: AdminServiceService,
    private snackBar: MatSnackBar, // Inject MatSnackBar
    private router: Router // Inject Router
  ) { 
      this.clientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cin: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      educationLevel: ['', Validators.required],
      orientation: ['', Validators.required],
      clientId: [{ value: '', disabled: true }] 
    });
  }

  ngOnInit(): void {
  }

  generateClientId(): void {
    const cin = this.clientForm.get('cin')?.value;
    const firstName = this.clientForm.get('firstName')?.value;
    const lastName = this.clientForm.get('lastName')?.value;

    if (cin && firstName && lastName) {
      const firstThreeCin = cin.substring(0, 3);
      const firstTwoFirstName = firstName.substring(0, 2).toUpperCase();
      const firstTwoLastName = lastName.substring(0, 2).toUpperCase();
      const timestamp = Date.now().toString(); 
      const timestampPart = timestamp.substring(0, 5); 
      const clientId = `${firstThreeCin}${firstTwoFirstName}${firstTwoLastName}${timestampPart}`;
      this.clientForm.patchValue({ clientId }); 
    }
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      const userData = {
        clientId: this.clientForm.get('clientId')?.value,
        password: this.clientForm.get('cin')?.value,
        prenom: this.clientForm.get('firstName')?.value,
        nom: this.clientForm.get('lastName')?.value,
        cin: this.clientForm.get('cin')?.value,
        age: this.clientForm.get('age')?.value,
        email: this.clientForm.get('email')?.value,
        education: this.clientForm.get('educationLevel')?.value,
        orientation: this.clientForm.get('orientation')?.value,
        banned: false,
        type: 'User',
        code: null // Ensure this is null, not "null"
      };
  
      console.log('User Data:', userData); // Log user data for debugging
  
      this.adminService.addClient(userData).subscribe(
        response => {
          console.log('Client successfully added:', response);
          this.errorMessage = null; // Clear any previous error message
          
          // Show a Snackbar message
          this.snackBar.open('Le client a été ajouté avec succés', 'Fermer', {
            duration: 3000, // Duration in milliseconds
          });
  
          // Redirect to /admindashboard
          this.router.navigate(['/admindashboard']);
        },
        error => {
          console.error('Error adding client:', error);
          console.error('Error response:', error.error); // Log detailed error response
          this.errorMessage = error.error.message || 'An unexpected error occurred.'; // Set the error message
        }
      );
    } else {
      console.log('Form is invalid. Please fill in all required fields.');
      this.errorMessage = 'Please fill in all required fields.'; // Set a general error message for invalid form
    }
  }
  
  goBack(): void {
    this.location.back(); 
  }
}
