import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

interface User {
  firstName: string;
  lastName: string;
  cin: string;
  email: string;
  clientId: string;
  isBanned: boolean; // Add this property to track banned status
}

@Component({
  selector: 'app-clientaccess',
  templateUrl: './clientaccess.component.html',
  styleUrls: ['./clientaccess.component.css'] // Changed styleUrl to styleUrls
})
export class ClientaccessComponent {

  users: User[] = [
    { firstName: 'John', lastName: 'Doe', cin: '12345678', email: 'john@example.com', clientId: '116HABE17275', isBanned: false },
    { firstName: 'Jane', lastName: 'Smith', cin: '78901296', email: 'jane@example.com', clientId: '114ASBE17275', isBanned: false },
    { firstName: 'Mike', lastName: 'Johnson', cin: '23456789', email: 'mike.johnson@example.com', clientId: '115CABE17275', isBanned: false },
    { firstName: 'Emma', lastName: 'Williams', cin: '89012345', email: 'emma.williams@example.com', clientId: '117DABE17275', isBanned: false },
    { firstName: 'David', lastName: 'Brown', cin: '34567890', email: 'david.brown@example.com', clientId: '118EABE17275', isBanned: false },
    { firstName: 'Sophia', lastName: 'Jones', cin: '56789012', email: 'sophia.jones@example.com', clientId: '119FABE17275', isBanned: false },
    { firstName: 'Chris', lastName: 'Miller', cin: '67890123', email: 'chris.miller@example.com', clientId: '120GABE17275', isBanned: false },
    { firstName: 'Olivia', lastName: 'Davis', cin: '78901234', email: 'olivia.davis@example.com', clientId: '121HABE17275', isBanned: false },
    { firstName: 'Liam', lastName: 'Garcia', cin: '89012345', email: 'liam.garcia@example.com', clientId: '122IABE17275', isBanned: false },
    { firstName: 'Ava', lastName: 'Martinez', cin: '90123456', email: 'ava.martinez@example.com', clientId: '123JABE17275', isBanned: false },
    { firstName: 'Noah', lastName: 'Rodriguez', cin: '01234567', email: 'noah.rodriguez@example.com', clientId: '124KABE17275', isBanned: false },
    { firstName: 'Isabella', lastName: 'Hernandez', cin: '12345678', email: 'isabella.hernandez@example.com', clientId: '125LABE17275', isBanned: false },
    { firstName: 'Lucas', lastName: 'Lopez', cin: '23456789', email: 'lucas.lopez@example.com', clientId: '126MABE17275', isBanned: false },
    { firstName: 'Mia', lastName: 'Gonzalez', cin: '34567890', email: 'mia.gonzalez@example.com', clientId: '127NABE17275', isBanned: false },
    { firstName: 'James', lastName: 'Wilson', cin: '45678901', email: 'james.wilson@example.com', clientId: '128OABE17275', isBanned: false },
    { firstName: 'Amelia', lastName: 'Anderson', cin: '56789012', email: 'amelia.anderson@example.com', clientId: '129PABE17275', isBanned: false },
    { firstName: 'Benjamin', lastName: 'Thomas', cin: '67890123', email: 'benjamin.thomas@example.com', clientId: '130QABE17275', isBanned: false },
    { firstName: 'Charlotte', lastName: 'Taylor', cin: '78901234', email: 'charlotte.taylor@example.com', clientId: '131RABE17275', isBanned: false },
    { firstName: 'Elijah', lastName: 'Moore', cin: '89012345', email: 'elijah.moore@example.com', clientId: '132SABE17275', isBanned: false },
    { firstName: 'Emily', lastName: 'Jackson', cin: '90123456', email: 'emily.jackson@example.com', clientId: '133TABE17275', isBanned: false },
];

  searchTerm: string = '';
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['firstName', 'lastName', 'cin', 'email', 'clientId', 'actions'];
  selectedUser: User | null = null; // Allow selectedUser to be null
  isConfirming: boolean = false;

  constructor() {
    this.dataSource = new MatTableDataSource(this.users); // Initialize data source
  }

  goBack() {
    // Logic to navigate back, e.g., using Angular Router
    window.history.back(); // Simple back navigation
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Apply the filter
  }

  banUser(user: User) {
    user.isBanned = !user.isBanned; // Toggle the banned status
  }
}
