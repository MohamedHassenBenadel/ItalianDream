import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-visadocuments',
  templateUrl: './visadocuments.component.html',
  styleUrl: './visadocuments.component.css'
})
export class VisadocumentsComponent {

  displayedColumns: string[] = ['document', 'disponibility','deadline'];
  dataSource = ELEMENT_DATA;

  constructor(private location: Location) {}

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();  // This will navigate to the previous page
  }

}

const ELEMENT_DATA = [
  { 
    document: 'التصريح بالضريبة على الدخل السنوي', 
    disponibility: 'Not Available',
    deadline: '2024-10-01'  // Example deadline
  },
  { 
    document: 'شهادة حياة جماعية', 
    disponibility: 'Not Available',
    deadline: '2024-10-07'  // Example deadline
  },
  { 
    document: 'شهادة في عدم الملكية', 
    disponibility: 'Not Available',
    deadline: '2024-10-10'  // Example deadline
  },
  { 
    document: 'Historique CNSS / Affiliation CNRPS', 
    disponibility: 'Not Available',
    deadline: '2024-10-15'  // Example deadline
  },
  { 
    document: '6 Derniers extrait bancaire', 
    disponibility: 'Available',
    deadline: '2024-09-30'  // Example deadline
  },
  { 
    document: 'Attestation de retraite', 
    disponibility: 'Available',
    deadline: '2024-09-28'  // Example deadline
  },
  { 
    document: 'Attesation de prise en charge', 
    disponibility: 'Available',
    deadline: '2024-10-05'  // Example deadline
  },
  { 
    document: 'Extrait de naissance francais', 
    disponibility: 'Available',
    deadline: '2024-09-25'  // Example deadline
  },
  { 
    document: 'recu postale', 
    disponibility: 'Available',
    deadline: '2024-10-01'  // Example deadline
  },
  { 
    document: 'Deux photos', 
    disponibility: 'Available',
    deadline: '2024-09-20'  // Example deadline
  },
  { 
    document: 'Compte bloqué', 
    disponibility: 'Available',
    deadline: '2024-10-10'  // Example deadline
  },
];
