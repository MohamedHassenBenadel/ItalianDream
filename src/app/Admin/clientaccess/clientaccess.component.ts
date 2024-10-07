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
    // ... add more users as needed
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
