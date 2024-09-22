import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  showChangePasswordForm: boolean = false;
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('newPassword')?.value === formGroup.get('confirmPassword')?.value ? null : { mismatch: true };
  }



  toggleChangePassword() {
    this.showChangePasswordForm = !this.showChangePasswordForm;
    const passwordForm = document.getElementById('change-password-form');
    if (passwordForm) {
      passwordForm.style.display = this.showChangePasswordForm ? 'block' : 'none';
    }
  }

  submitNewPassword() {
    
  }


}
