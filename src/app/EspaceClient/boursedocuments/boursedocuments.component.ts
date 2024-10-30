import { Component } from '@angular/core';
import { Location } from '@angular/common';

interface BourseDocument {
  document: string;
  disponibility: string;
  deadline: string; 
}


@Component({
  selector: 'app-boursedocuments',
  templateUrl: './boursedocuments.component.html',
  styleUrl: './boursedocuments.component.css'
})
export class BoursedocumentsComponent {
  displayedColumns: string[] = ['document', 'disponibility','deadline'];
  dataSource: BourseDocument[] = [];

  constructor(private location: Location) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

  goBack(): void {
    this.location.back();  // This will navigate to the previous page
  }


  loadDocuments(): void {
    const clientData = localStorage.getItem('client');
    if (clientData) {
      const client = JSON.parse(clientData);
      const visaDocuments = client.documentsBourse;
  
      // Build the data source based on the visa documents
      this.dataSource = Object.keys(visaDocuments)
        .filter(key => key.startsWith('doc') && !key.includes('DueDate')) // Only include doc keys, excluding DueDate
        .map(key => ({
          document: key,  // Using the key (e.g., "doc1", "doc2", "doc3")
          disponibility: visaDocuments[key] ? 'Available' : 'Not Available',  // Availability
          deadline: visaDocuments[`${key}DueDate`] // Corresponding due date
        }));
    }
  }

}

