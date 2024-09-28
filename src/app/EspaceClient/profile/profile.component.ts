import { Component, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  @ViewChild('ChangePasswordDialog') changePasswordDialog!: TemplateRef<any>;

  passwordForm: FormGroup;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
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
      console.log(this.passwordForm.value);
      this.dialog.closeAll(); // Close the modal after submission
    }
  }
}
