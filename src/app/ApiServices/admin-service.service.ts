import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface DocumentsUni {
  doc1: boolean;
  doc1DueDate: string;
  doc2: boolean;
  doc2DueDate: string;
  doc3: boolean;
  doc3DueDate: string;
}

export interface DocumentsBourse {
  doc1: boolean;
  doc1DueDate: string;
  doc2: boolean;
  doc2DueDate: string;
  doc3: boolean;
  doc3DueDate: string;
}

export interface DocumentsVisa {
  doc1: boolean;
  doc1DueDate: string;
  doc2: boolean;
  doc2DueDate: string;
  doc3: boolean;
  doc3DueDate: string;
}

export interface Paiement {
  paiementId: number;
  nom: string; // Payment name
  montant: number; // Total amount
  montantPaye: number; // Amount paid
  montantRestant: number; // Remaining amount
  dateLimite: string; // Due date
  paid: boolean; // Payment status
}

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  private baseUrl = 'http://localhost:8080/apiclient'; 
  private baseDocumentUrl = 'http://localhost:8080/apidocuments'; 
  private basePaymentUrl = 'http://localhost:8080/apiPaiement'; // Add this line for payments API



  constructor(private http: HttpClient) { }

  addClient(clientData: any): Observable<any> {
    const url = `${this.baseUrl}/add-client`; 
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(url, clientData, { headers });
  }

    getAllClients(): Observable<any> {
      const url = `${this.baseUrl}/get-all-clients`; 
      return this.http.get<any>(url);
    }

      // Method to update university documents
  updateDocumentUni(clientId: string, documents: DocumentsUni): Observable<any> {
    const url = `${this.baseDocumentUrl}/update-doc-uni?client_id=${clientId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(url, documents, { headers });
  }

  // Method to update scholarship documents
  updateDocumentBourse(clientId: string, documents: DocumentsBourse): Observable<any> {
    const url = `${this.baseDocumentUrl}/update-doc-bourse?client_id=${clientId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(url, documents, { headers });
  }

  // Method to update visa documents
  updateDocumentVisa(clientId: string, documents: DocumentsVisa): Observable<any> {
    const url = `${this.baseDocumentUrl}/update-doc-visa?client_id=${clientId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(url, documents, { headers });
  }


  updatePayment(clientId: string, payments: Paiement[]): Observable<any> {
    const url = `${this.basePaymentUrl}/update?client_id=${clientId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(url, payments, { headers });
  }

  

}
