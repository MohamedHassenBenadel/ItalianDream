import { Component, ViewChild, AfterViewInit, TemplateRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminServiceService } from '../../ApiServices/admin-service.service'; // Adjust the path as necessary

@Component({
  selector: 'app-manage-payment',
  templateUrl: './manage-payment.component.html',
  styleUrls: ['./manage-payment.component.css'] // Fixed the styleUrls array
})
export class ManagePaymentComponent implements AfterViewInit {
  selectedUser: any; // Changed to any to avoid creating models
  paymentDataSource: MatTableDataSource<any> = new MatTableDataSource<any>(); // Use any for Payment as well

  @ViewChild('paymentDialog') paymentDialog!: TemplateRef<any>;
  private dialogRef!: MatDialogRef<any>;

  displayedColumns: string[] = ['firstName', 'lastName', 'cin', 'email', 'clientId', 'actions'];
  dataSource = new MatTableDataSource<any>([]); // Start with an empty array

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private location: Location, public dialog: MatDialog, private adminService: AdminServiceService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.fetchClients(); // Fetch clients when the view initializes
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openPaymentDialog(user: any) {
    this.selectedUser = user; // Set selectedUser when opening the dialog
    this.paymentDataSource.data = this.getPayments(); // Initialize payment data

    console.log(user);
    console.log(this.paymentDataSource.data);


    const dialogData = {
      user: user,
      payments: this.paymentDataSource.data
    };

    this.dialogRef = this.dialog.open(this.paymentDialog, {
      width: '1000px',
      data: dialogData
    });
  }

  closeDialog() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  onSavePayment() {
    const payments = this.paymentDataSource.data;

    // Update montantRestant based on the paid amount
    payments.forEach(payment => {
      payment.montantRestant = payment.montant - payment.montantPaye; // Calculate remaining amount
    });

    // Call the API to update payments
    this.adminService.updatePayment(this.selectedUser.clientId, payments).subscribe(
      response => {
        console.log('Payments updated successfully:', response);
        this.closeDialog(); // Close dialog on success
      },
      error => {
        console.error('Error updating payments:', error);
      }
    );
  }

  getPayments(): any[] { 
    if (this.selectedUser && this.selectedUser.payments) {
        // Log payments before sorting
        console.log('Before Sorting:', this.selectedUser.payments);
        
        // Sort payments by paiementId
        const sortedPayments = this.selectedUser.payments.sort((a: any, b: any) => a.paiementId - b.paiementId);
        
        // Log payments after sorting
        console.log('After Sorting:', sortedPayments);
        return sortedPayments;
    }
    return []; // Return an empty array if no payments are found
}

  fetchClients() {
    this.adminService.getAllClients().subscribe((clients: any[]) => { 
      this.dataSource.data = clients; 
    });
  }
    
  
  goBack(): void {
    this.location.back();
  }
}
