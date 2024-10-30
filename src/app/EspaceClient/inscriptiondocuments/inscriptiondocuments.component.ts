import { Component } from '@angular/core';
import { Location } from '@angular/common';

interface DocumentUni {
  document: string;
  disponibility: string;
  deadline: string; // Change to Date if you want to handle dates more specifically
}


@Component({
  selector: 'app-inscriptiondocuments',
  templateUrl: './inscriptiondocuments.component.html',
  styleUrl: './inscriptiondocuments.component.css'
})
export class InscriptiondocumentsComponent {

  displayedColumns: string[] = ['document', 'disponibility','deadline'];
  dataSource: DocumentUni[] = [];

  constructor(private location: Location) {}


  ngOnInit(): void {
    this.loadDocuments();
  }

  goBack(): void {
    this.location.back();  
  }

  loadDocuments(): void {
    const clientData = localStorage.getItem('client');
    if (clientData) {
      const client = JSON.parse(clientData);
      const visaDocuments = client.documentsUni;
  
      this.dataSource = Object.keys(visaDocuments)
        .filter(key => key.startsWith('doc') && !key.includes('DueDate')) 
        .map(key => ({
          document: key,  
          disponibility: visaDocuments[key] ? 'Available' : 'Not Available', 
          deadline: visaDocuments[`${key}DueDate`]
        }));
    }
  }
  }

