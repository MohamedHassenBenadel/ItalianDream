import { Component, OnInit } from '@angular/core';

export interface Tranche {
  id: string;
  montant: number;
  montantPaye: number;
  montantRestant: number;
  paid: boolean;
  dateLimit: Date;
}

// Define the structure for the payment items in the client data
interface ClientPayment {
  paiementId: number;
  nom: string;
  montant: number;
  montantPaye: number;
  montantRestant: number;
  dateLimite: string;  // Date is in string format
  paid: boolean;
}

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {
  tranches: Tranche[] = [];
  displayedColumns: string[] = ['id', 'montant', 'montantPaye', 'montantRestant', 'paid', 'dateLimit'];
  
  totalMontantPaye: number = 0;
  totalMontantRestant: number = 0;

  ngOnInit() {
    this.loadClientPayments();
    this.calculateTotals();
  }

  loadClientPayments() {
    const clientData = localStorage.getItem('client');
    if (clientData) {
      const client = JSON.parse(clientData);
      const payments: ClientPayment[] = client.payments || [];  // Explicitly type payments

      // Map payments to the `tranches` array with `ClientPayment` type
      this.tranches = payments.map((payment: ClientPayment) => ({
        id: payment.nom,
        montant: payment.montant,
        montantPaye: payment.montantPaye,
        montantRestant: payment.montantRestant,
        paid: payment.paid,
        dateLimit: new Date(payment.dateLimite)  // Convert date string to Date object
      }));
    }
  }

  calculateTotals() {
    this.totalMontantPaye = this.tranches.reduce((sum, tranche) => sum + tranche.montantPaye, 0);
    this.totalMontantRestant = this.tranches.reduce((sum, tranche) => sum + tranche.montantRestant, 0);
  }
}
