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
}

export interface Payment {
  tranche: string;
  paid: boolean;
  montantPaye: number;
  montantRestant: number;
  montantTotal?: number; // Optional field for total amount
}

@Component({
  selector: 'app-manage-payment',
  templateUrl: './manage-payment.component.html',
  styleUrl: './manage-payment.component.css'
})
export class ManagePaymentComponent implements AfterViewInit{
  selectedUser!: User;
  paymentDataSource: MatTableDataSource<Payment> = new MatTableDataSource<Payment>();

  @ViewChild('paymentDialog') paymentDialog!: TemplateRef<any>;
  private dialogRef!: MatDialogRef<any>;

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

  paymentDisplayedColumns: string[] = ['tranche', 'paid', 'montantPaye', 'montantRestant'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private location: Location, public dialog: MatDialog) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openPaymentDialog(user: User) {
    this.selectedUser = user; // Set selectedUser when opening the dialog
    this.paymentDataSource.data = this.getPayments(); // Initialize payment data

    const dialogData = {
      user: user,
      payments: this.paymentDataSource.data
    };

    this.dialogRef = this.dialog.open(this.paymentDialog, {
      width: '800px',
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
    console.log('User:', this.selectedUser);
    console.log('Payments:', payments);

    // Here you can add logic to save the payment data to your backend

    // Example: Calculate montantRestant based on montantPaye
    payments.forEach(payment => {
      if (payment.montantTotal !== undefined && payment.montantTotal !== null) {
        payment.montantRestant = payment.montantTotal - payment.montantPaye;
      } else {
        payment.montantRestant = 0; // Or handle as needed
      }
    });
    
    this.closeDialog(); // Close the dialog after saving
  }

  getPayments(): Payment[] {
    return [
      { tranche: 'Tranche 1', paid: false, montantPaye: 0, montantRestant: 0, montantTotal: 0 },
      { tranche: 'Tranche 2', paid: false, montantPaye: 0, montantRestant: 0, montantTotal: 0 },
      { tranche: 'Tranche 3', paid: false, montantPaye: 0, montantRestant: 0, montantTotal: 0 },
      { tranche: 'Tranche 4', paid: false, montantPaye: 0, montantRestant: 0, montantTotal: 0 }
    ];
  }

  goBack(): void {
    this.location.back();
  }


}
