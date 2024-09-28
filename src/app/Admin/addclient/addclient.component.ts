import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.css'] 
})
export class AddclientComponent implements OnInit {

  clientForm: FormGroup;

  constructor(private fb: FormBuilder, private location: Location) { 
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
        firstName: this.clientForm.get('firstName')?.value,
        lastName: this.clientForm.get('lastName')?.value,
        email: this.clientForm.get('email')?.value,
        cin: this.clientForm.get('cin')?.value,
        age: this.clientForm.get('age')?.value,
        educationLevel: this.clientForm.get('educationLevel')?.value,
        orientation: this.clientForm.get('orientation')?.value,
        clientId: this.clientForm.get('clientId')?.value,
        password: this.clientForm.get('cin')?.value // Set password equal to CIN
      };

      console.log('User data to be added to the database:', userData);
    } else {
      console.log('Form is invalid. Please fill in all required fields.');
    }
  }

  goBack(): void {
    this.location.back(); 
  }
}
