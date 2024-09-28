import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface User {
  firstName: string;
  lastName: string;
  cin: string;
  email: string;
  clientId: string;
  showDropdown?: boolean;
}

@Component({
  selector: 'app-managedoucments',
  templateUrl: './managedoucments.component.html',
  styleUrls: ['./managedoucments.component.css']
})
export class ManagedoucmentsComponent implements AfterViewInit {
  users: User[] = [
    { firstName: 'John', lastName: 'Doe', cin: '12345678', email: 'john@example.com', clientId: '116HABE17275' },
    { firstName: 'Jane', lastName: 'Smith', cin: '78901296', email: 'jane@example.com', clientId: '114ASBE17275' },
    { firstName: 'Michael', lastName: 'Johnson', cin: '23456789', email: 'michael@example.com', clientId: '113MABE17275' },
    { firstName: 'Emily', lastName: 'Davis', cin: '34567890', email: 'emily@example.com', clientId: '112KABE17275' },
    { firstName: 'David', lastName: 'Martinez', cin: '45678901', email: 'david@example.com', clientId: '115ZABE17275' },
    { firstName: 'Sophia', lastName: 'Garcia', cin: '56789012', email: 'sophia@example.com', clientId: '118XABE17275' },
    { firstName: 'Daniel', lastName: 'Hernandez', cin: '67890123', email: 'daniel@example.com', clientId: '117WABE17275' },
    { firstName: 'Olivia', lastName: 'Lopez', cin: '78901234', email: 'olivia@example.com', clientId: '120VABE17275' },
    { firstName: 'James', lastName: 'Wilson', cin: '89012345', email: 'james@example.com', clientId: '119UABE17275' },
    { firstName: 'Isabella', lastName: 'Anderson', cin: '90123456', email: 'isabella@example.com', clientId: '121TABE17275' },
    { firstName: 'Hassen', lastName: 'Benadel', cin: '11662899', email: 'hassen@example.com', clientId: '213JMT3896' }
  ];

  displayedColumns: string[] = ['firstName', 'lastName', 'cin', 'email', 'clientId', 'actions'];
  dataSource = new MatTableDataSource<User>(this.users);

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Non-null assertion operator added

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  manageDocuments(user: User) {
    console.log('Manage documents for:', user);
  }

  toggleDropdown(user: User) {
    this.users.forEach(u => {
      if (u !== user) {
        u.showDropdown = false;
      }
    });
    user.showDropdown = !user.showDropdown;
  }
}
