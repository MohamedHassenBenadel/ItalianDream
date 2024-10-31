import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { AdminServiceService } from '../../ApiServices/admin-service.service'; 

interface User {
  clientId: string;
  prenom: string;
  nom: string;
  cin: string;
  email: string;
  banned: boolean;
}

@Component({
  selector: 'app-clientaccess',
  templateUrl: './clientaccess.component.html',
  styleUrls: ['./clientaccess.component.css']
})
export class ClientaccessComponent implements OnInit {
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  displayedColumns: string[] = ['prenom', 'nom', 'cin', 'email', 'clientId', 'actions'];
  selectedUser: User | null = null;
  isConfirming: boolean = false;

  constructor(private http: HttpClient, private adminService: AdminServiceService) {} 

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients() {
    this.http.get<User[]>('http://localhost:8080/apiclient/get-all-clients')
      .subscribe(
        data => {
          // Map the API data to match the displayed fields in the table
          console.log(data);
          this.dataSource.data = data.map(client => ({
            clientId: client.clientId,
            prenom: client.prenom,
            nom: client.nom,
            cin: client.cin.toString(),
            email: client.email,
            banned: client.banned,
          }));
        },
        error => {
          console.error('Error fetching clients:', error);
        }
      );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goBack() {
    window.history.back();
  }

  banUser(user: User) {
    const action = user.banned ? 'unban' : 'ban'; // Determine the action
    const clientId = user.clientId;

    if (action === 'ban') {
      this.adminService.banClient(clientId).subscribe(
        () => {
          user.banned = true; // Update the UI
          console.log(`User ${clientId} has been banned.`);
        },
        error => {
          console.error('Error banning user:', error);
        }
      );
    } else {
      this.adminService.unbanClient(clientId).subscribe(
        () => {
          user.banned = false; 
          console.log(`User ${clientId} has been unbanned.`);
        },
        error => {
          console.error('Error unbanning user:', error);
        }
      );
    }
  }
}
