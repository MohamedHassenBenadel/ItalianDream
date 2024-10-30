import { Component, ViewChild, AfterViewInit, TemplateRef, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminServiceService } from '../../ApiServices/admin-service.service'; 

export interface User {
  firstName: string;
  lastName: string;
  cin: string;
  email: string;
  clientId: string;
  documentsVisa?: DocumentData; // Changed to DocumentData
  documentsUni?: DocumentData; 
  documentsBourse?: DocumentData;
  showDropdown?: boolean;
}

export interface DocumentData {
  id: number;  // Add this line to include the id
  doc1: boolean;
  doc1DueDate: string;
  doc2: boolean;
  doc2DueDate: string;
  doc3: boolean;
  doc3DueDate: string;
}

export interface Document {
  name: string;
  available: boolean;
  dueDate: string; // Added for due date
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
export class ManagedoucmentsComponent implements OnInit, AfterViewInit {
  selectedUser!: User; 
  selectedDocumentType: string = '';
  documentDataSource: MatTableDataSource<Document> = new MatTableDataSource<Document>([]);

  @ViewChild('documentDialog') documentDialog!: TemplateRef<any>;
  private dialogRef!: MatDialogRef<any>;

  users: User[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'cin', 'email', 'clientId', 'actions'];
  dataSource = new MatTableDataSource<User>(this.users);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private location: Location, public dialog: MatDialog, private adminService: AdminServiceService) {}

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients(): void {
    this.adminService.getAllClients().subscribe(
      (data: User[]) => {
        this.users = data;
        this.dataSource.data = this.users;
      },
      (error) => {
        console.error('Error fetching clients:', error);
      }
    );
  }
    
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openDocumentDialog(user: User, documentType: string) {
    this.selectedUser = user;
    this.selectedDocumentType = documentType;

    let documents: Document[] = [];

    const docData = this.getDocumentData(user, documentType);
    console.log(docData);


    if (docData) {
      documents = [
        { name: 'Document 1', available: docData.doc1, dueDate: docData.doc1DueDate },
        { name: 'Document 2', available: docData.doc2, dueDate: docData.doc2DueDate },
        { name: 'Document 3', available: docData.doc3, dueDate: docData.doc3DueDate },
      ];
    }
  
    this.documentDataSource.data = documents; // Set the data source for the dialog
  
    this.dialogRef = this.dialog.open(this.documentDialog, {
      width: '800px',
      data: { user: user, documents: documents } // Send the documents directly
    });
  }

  // Helper method to get document data based on type
  private getDocumentData(user: User, documentType: string): DocumentData | undefined {
    if (documentType === 'VISA') {
      return user.documentsVisa;
    } else if (documentType === 'Bourse') {
      return user.documentsBourse;
    } else if (documentType === 'Inscription') {
      return user.documentsUni;
    }
    return undefined;
  }

  closeDialog() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  onEnregister(data: DocumentDialogData) {
    const user = data.user;
    const documents = data.documents;
    const clientId = user.clientId; // Assuming the user object contains the client ID
    let formattedDocuments;

    // Create the formatted document object based on the documents array
    formattedDocuments = {
        doc1: documents[0]?.available,
        doc1DueDate: documents[0]?.dueDate,
        doc2: documents[1]?.available,
        doc2DueDate: documents[1]?.dueDate,
        doc3: documents[2]?.available,
        doc3DueDate: documents[2]?.dueDate,
    };

    console.log('Formatted Documents:', formattedDocuments);

    // Determine which update method to call based on the document type
    let updateObservable;

    if (this.selectedDocumentType === 'Bourse') {
        updateObservable = this.adminService.updateDocumentBourse(clientId, formattedDocuments);
    } else if (this.selectedDocumentType === 'VISA') {
        updateObservable = this.adminService.updateDocumentVisa(clientId, formattedDocuments);
    } else if (this.selectedDocumentType === 'Inscription') {
        updateObservable = this.adminService.updateDocumentUni(clientId, formattedDocuments);
    }

    if (updateObservable) {
        updateObservable.subscribe(
            response => {
                console.log(`${this.selectedDocumentType} documents updated successfully:`, response);
                // Refresh the clients data after successful update
                this.fetchClients();
            },
            error => {
                console.error(`Error updating ${this.selectedDocumentType} documents:`, error);
            }
        );
    }

    this.closeDialog();
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
