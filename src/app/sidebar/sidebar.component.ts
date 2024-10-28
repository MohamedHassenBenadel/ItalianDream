import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'] // Fixed to 'styleUrls' instead of 'styleUrl'
})
export class SidebarComponent {
  isSidebarVisible: boolean = true; // Sidebar is visible by default
  isMobile: boolean = false; // Initially set to false

  // Listen for window resize events
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkViewportSize(); // Check viewport size on resize
  }

  constructor(private router: Router, private dialog: MatDialog) {
    this.checkViewportSize(); // Check viewport size on initialization
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
    <mat-dialog-actions align="center">
      <button mat-button (click)="onCancel()">Annuler</button>
      <button mat-button color="primary" (click)="onConfirm()">Confirmer</button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-actions {
      display: flex;
      justify-content: center;
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
