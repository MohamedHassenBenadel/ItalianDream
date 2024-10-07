import { Component, ViewChild, AfterViewInit, TemplateRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

export interface User {
  firstName: string;
  lastName: string;
  cin: string;
  email: string;
  clientId: string;
  showDropdown?: boolean;
}

export interface Document {
  name: string;
  available: boolean;
}

interface DocumentDialogData {
  user: User;
  documents: Document[];
}

@Component({
  selector: 'app-managedoucments',
  templateUrl: './managedoucments.component.html',
  styleUrls: ['./managedoucments.component.css']
})
export class ManagedoucmentsComponent implements AfterViewInit {
  selectedUser!: User; 
  selectedDocumentType: string = '';
  documentDataSource: MatTableDataSource<Document> = new MatTableDataSource<Document>([]);

  @ViewChild('documentDialog') documentDialog!: TemplateRef<any>;
  private dialogRef!: MatDialogRef<any>;

  constructor(private location: Location, public dialog: MatDialog) {}

  users: User[] = [
    { firstName: 'John', lastName: 'Doe', cin: '12345678', email: 'john@example.com', clientId: '116HABE17275' },
    { firstName: 'Jane', lastName: 'Smith', cin: '78901296', email: 'jane@example.com', clientId: '114ASBE17275' },
    { firstName: 'Alice', lastName: 'Johnson', cin: '23456789', email: 'alice@example.com', clientId: '113ABC17275' },
    { firstName: 'Bob', lastName: 'Brown', cin: '34567890', email: 'bob@example.com', clientId: '112XYZ17275' },
    { firstName: 'Charlie', lastName: 'Davis', cin: '45678901', email: 'charlie@example.com', clientId: '111DEF17275' },
    { firstName: 'Diana', lastName: 'Garcia', cin: '56789012', email: 'diana@example.com', clientId: '110GHI17275' },
    { firstName: 'Ethan', lastName: 'Martinez', cin: '67890123', email: 'ethan@example.com', clientId: '109JKL17275' },
    { firstName: 'Fiona', lastName: 'Hernandez', cin: '78901234', email: 'fiona@example.com', clientId: '108MNO17275' },
    { firstName: 'George', lastName: 'Lopez', cin: '89012345', email: 'george@example.com', clientId: '107PQR17275' },
    { firstName: 'Hannah', lastName: 'Wilson', cin: '90123456', email: 'hannah@example.com', clientId: '106STU17275' },
    { firstName: 'Isabella', lastName: 'Anderson', cin: '01234567', email: 'isabella@example.com', clientId: '105VWX17275' },
    { firstName: 'Jack', lastName: 'Thomas', cin: '12345679', email: 'jack@example.com', clientId: '104YZA17275' },
    { firstName: 'Kylie', lastName: 'Moore', cin: '23456780', email: 'kylie@example.com', clientId: '103BCD17275' },
    { firstName: 'Liam', lastName: 'Taylor', cin: '34567891', email: 'liam@example.com', clientId: '102EFG17275' },
    { firstName: 'Mia', lastName: 'Jackson', cin: '45678902', email: 'mia@example.com', clientId: '101HIJ17275' },
    { firstName: 'Noah', lastName: 'White', cin: '56789013', email: 'noah@example.com', clientId: '100KLM17275' },
    { firstName: 'Olivia', lastName: 'Harris', cin: '67890124', email: 'olivia@example.com', clientId: '99NOP17275' },
    { firstName: 'Paul', lastName: 'Martin', cin: '78901235', email: 'paul@example.com', clientId: '98QRS17275' },
    { firstName: 'Quinn', lastName: 'Thompson', cin: '89012346', email: 'quinn@example.com', clientId: '97TUV17275' },
    { firstName: 'Ryan', lastName: 'Garcia', cin: '90123457', email: 'ryan@example.com', clientId: '96WXY17275' },
    { firstName: 'Sophia', lastName: 'Martinez', cin: '01234568', email: 'sophia@example.com', clientId: '95ZAB17275' }
  ];
  
    displayedColumns: string[] = ['firstName', 'lastName', 'cin', 'email', 'clientId', 'actions'];
  dataSource = new MatTableDataSource<User>(this.users);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator; 

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openDocumentDialog(user: User, documentType: string) {
    this.selectedUser = user; // Set selectedUser when opening the dialog
    this.selectedDocumentType = documentType;
    this.documentDataSource.data = this.getDocumentsByType(documentType);

    const dialogData: DocumentDialogData = {
      user: user,
      documents: this.documentDataSource.data
    };

    this.dialogRef = this.dialog.open(this.documentDialog, {
      width: '800px',
      data: dialogData
    });
  }

  closeDialog() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  onEnregister(data: DocumentDialogData) {
    const user = data.user; // Access the user data
    const documents = data.documents; // Access the documents data

    console.log('User Info:', user);
    console.log('Documents Info:', documents);
    
    // Log availability of documents
    documents.forEach(doc => {
      console.log(`Document: ${doc.name}, Available: ${doc.available}`);
    });

    this.closeDialog(); // Close the dialog after logging
  }

  getDocumentsByType(type: string): Document[] {
    switch (type) {
      case 'VISA':
        return [
          { name: 'Passport Copy', available: false }, 
          { name: 'Visa Application Form', available: false }
        ];
      case 'Inscription':
        return [
          { name: 'High School Diploma', available: false }, 
          { name: 'University Registration Form', available: false }
        ];
      case 'Bourse':
        return [
          { name: 'Financial Aid Application', available: false }, 
          { name: 'Tax Returns', available: false }
        ];
      default:
        return [];
    }
  }

  toggleDropdown(user: User) {
    this.users.forEach(u => {
      if (u !== user) {
        u.showDropdown = false;
      }
    });
    user.showDropdown = !user.showDropdown;
  }

  goBack(): void {
    this.location.back();
  }
}
