import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css'
})
export class AdmindashboardComponent {


  constructor( private location: Location) {}


  goBack(): void {
    this.location.back(); 
  }
}