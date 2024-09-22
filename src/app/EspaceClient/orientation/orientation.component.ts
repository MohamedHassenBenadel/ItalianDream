import { Component } from '@angular/core';

interface University {
  name: string;
  image: string; // Path to the image
  region: string; // Region of the university
}


@Component({
  selector: 'app-orientation',
  templateUrl: './orientation.component.html',
  styleUrl: './orientation.component.css'
})
export class OrientationComponent {


  selectedRegion: string = 'Lazio';
  regions: string[] = ['Lazio', 'Campania', 'Tuscany']; 
  universities: University[] = [
    {
      name: 'Sapienza University of Rome',
      image: '../../../assets/Universities/Lazio/SapienzaUniversity.jpg',
      region: 'Lazio'
    },
    {
      name: 'Università degli Studi di Roma Tor Vergata',
      image: '../../../assets/Universities/Lazio/Università degli Studi di Roma Tor Vergata.JPG',
      region: 'Lazio'
    },
    {
      name: 'Roma Tre University',
      image: '../../../assets/Universities/Lazio/Roma Tre University.jpg',
      region: 'Lazio'
    },
    {
      name: 'University of Naples Federico II',
      image: '../../../assets/Universities/Campania/University of Naples Federico II.jpg',
      region: 'Campania'
    },
    {
      name: 'University of Naples "L\'Orientale"',
      image: '../../../assets/Universities/Campania/University of Naples LOrientale.jpg', // Add the correct path to the image
      region: 'Campania'
    },
    {
      name: 'University of Sannio',
      image: '../../../assets/Universities/Campania/University of Sannio.jpg', // Add the correct path to the image
      region: 'Campania'
    },
    {
      name: 'Parthenope University of Naples',
      image: '../../../assets/Universities/Campania/Parthenope University of Naples.jpg', // Add the correct path to the image
      region: 'Campania'
    },
    {
      name: 'University of Campania Luigi Vanvitelli',
      image: '../../../assets/Universities/Campania/University of Campania Luigi Vanvitelli.jpg', // Add the correct path to the image
      region: 'Campania'
    },
    {
      name: 'University of Salerno',
      image: '../../../assets/Universities/Campania/University of Salerno.jpg', // Add the correct path to the image
      region: 'Campania'
    },
    {
      name: 'University of Pisa',
      image: '../../../assets/Universities/Tuscany/University of Pisa.jpg', // Add the correct path to the image
      region: 'Tuscany'
    },
    {
      name: 'University of Florence',
      image: '../../../assets/Universities/Tuscany/University of Florence.jpg', // Add the correct path to the image
      region: 'Tuscany'
    },
    {
      name: 'University of Siena',
      image: '../../../assets/Universities/Tuscany/University of Siena.jpg', // Add the correct path to the image
      region: 'Tuscany'
    },
    {
      name: 'Normal School of Pisa',
      image: '../../../assets/Universities/Tuscany/Normal School of Pisa.jpg', // Add the correct path to the image
      region: 'Tuscany'
    },
    {
      name: 'Sant\'Anna School of Advanced Studies',
      image: '../../../assets/Universities/Tuscany/SantAnna School of Advanced Studies.jpg', // Add the correct path to the image
      region: 'Tuscany'
    }
  ];
    
  filteredUniversities(): University[] {
    return this.universities.filter(university => university.region === this.selectedRegion);
  }

  onRegionChange() {
    // Optional: Additional actions when the region changes
  }

}
