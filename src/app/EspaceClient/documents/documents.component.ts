import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent {


  constructor(private router: Router) {}

  navigateTo(docType: string): void {
    this.router.navigate([`/dashboard/documents/${docType}`]);
  }


}