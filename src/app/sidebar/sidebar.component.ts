import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'] // Fixed to 'styleUrls' instead of 'styleUrl'
})
export class SidebarComponent implements OnInit {
  isSidebarVisible: boolean = true; 
  isMobile: boolean = false; 

  clientName: string = ''; 
  


  // Listen for window resize events
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkViewportSize(); // Check viewport size on resize
  }

  constructor(private router: Router, private dialog: MatDialog) {
    this.checkViewportSize(); 
  }

  ngOnInit(): void { // Lifecycle hook
    const clientData = localStorage.getItem('client'); 
    if (clientData) {
      const client = JSON.parse(clientData); // Parse the stored JSON string
      this.clientName = `${client.prenom} ${client.nom}`; // Construct the client's full name
      console.log(this.clientName);
    }
  }


  checkViewportSize() {
    this.isMobile = window.innerWidth <= 768; // Set isMobile based on width
    this.isSidebarVisible = !this.isMobile; // Hide sidebar on mobile
  }



  isActiveRoute(route: string): boolean {
    // return this.router.url === route;
    return this.router.url.startsWith(route);
  }

  redirectTo(route: string) {
    this.router.navigate([route]);
  }

  // Method to open the confirmation dialog
  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogContent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // If the user confirmed, redirect to the login page
        this.redirectTo('/login');
      }
    });
  }
}

@Component({
  template: `
    <h2 mat-dialog-title>Confirmation</h2>
    <mat-dialog-content>
      <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onCancel()">Annuler</button>
      <button mat-button color="primary" (click)="onConfirm()">Confirmer</button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-actions {
      display: flex;
      justify-content: flex-end;
    }
    @media (max-width: 768px) {
      mat-dialog-actions {
        justify-content: center;
      }
    }

  `]
})

export class ConfirmDialogContent {
  constructor(private dialogRef: MatDialogRef<ConfirmDialogContent>) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
