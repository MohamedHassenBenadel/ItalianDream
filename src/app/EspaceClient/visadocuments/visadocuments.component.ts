import { Component } from '@angular/core';
import { Location } from '@angular/common';

interface VisaDocument {
  document: string;
  disponibility: string;
  deadline: string; 
}

@Component({
  selector: 'app-visadocuments',
  templateUrl: './visadocuments.component.html',
  styleUrls: ['./visadocuments.component.css']  // Corrected styleUrls to plural
})
export class VisadocumentsComponent {
  displayedColumns: string[] = ['document', 'disponibility', 'deadline'];
  dataSource: VisaDocument[] = [];

  private documentNameMapping: { [key: string]: string } = {
    doc1: 'شهادة في عدم الملكية',
    doc2: 'شهادة في عدم الملكية 1',
    doc3: 'شهادة في عدم الملكية 2',
  };


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
      const visaDocuments = client.documentsUni;
  
      this.dataSource = Object.keys(visaDocuments)
        .filter(key => key.startsWith('doc') && !key.includes('DueDate')) 
        .map(key => ({
          document: this.documentNameMapping[key] || key, 
          disponibility: visaDocuments[key] ? 'Available' : 'Not Available', 
          deadline: visaDocuments[`${key}DueDate`]
        }));
    }
  }
  }
