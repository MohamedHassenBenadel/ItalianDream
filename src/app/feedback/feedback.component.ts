import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  @ViewChild('stepper') stepper!: MatStepper;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  ratingFormGroup: FormGroup;

  isLinear = true;

  ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private _formBuilder: FormBuilder) {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      emailCtrl: ['', [Validators.required, Validators.email]]
    });

    this.secondFormGroup = this._formBuilder.group({
      feedbackCtrl: ['', Validators.required]
    });

    this.ratingFormGroup = this._formBuilder.group({
      ratingCtrl: [null, [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }

  sendFeedback(): void {
    console.log('Feedback submitted:', this.secondFormGroup.value.feedbackCtrl);
    this.stepper.next();
  }

  submitRating(): void {
    console.log('Rating submitted:', this.ratingFormGroup.value.ratingCtrl);
    this.stepper.reset();
  }

  selectRating(rating: number): void {
    this.ratingFormGroup.patchValue({ ratingCtrl: rating });
  }
}
