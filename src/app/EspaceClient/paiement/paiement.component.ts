import { Component, OnInit } from '@angular/core';

export interface Tranche {
  id: string;
  montant: number;
  montantPaye: number;
  montantRestant: number;
  paid: boolean;
}

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {
  tranches: Tranche[] = [
    { id: "Tranche 1", montant: 1500, montantPaye: 1000, montantRestant: 500, paid: false },
    { id: "Tranche 2", montant: 2000, montantPaye: 0, montantRestant: 2000, paid: false },
    { id: "Tranche 3", montant: 2000, montantPaye: 2000, montantRestant: 0, paid: true },
    { id: "Tranche 4", montant: 1000, montantPaye: 500, montantRestant: 500, paid: false }
  ];

  displayedColumns: string[] = ['id', 'montant', 'montantPaye', 'montantRestant', 'paid'];

  totalMontantPaye: number = 0;
  totalMontantRestant: number = 0;

  ngOnInit() {
    this.calculateTotals();
  }

  calculateTotals() {
    this.totalMontantPaye = this.tranches.reduce((sum, tranche) => sum + tranche.montantPaye, 0);
    this.totalMontantRestant = this.tranches.reduce((sum, tranche) => sum + tranche.montantRestant, 0);
  }
}
