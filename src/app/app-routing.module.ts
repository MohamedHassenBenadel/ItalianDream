import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardnIveauComponent } from './EspaceClient/dashboardn-iveau/dashboardn-iveau.component';
import { DocumentsComponent } from './EspaceClient/documents/documents.component';
import { PaiementComponent } from './EspaceClient/paiement/paiement.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ProfileComponent } from './EspaceClient/profile/profile.component';
import { VisadocumentsComponent } from './EspaceClient/visadocuments/visadocuments.component';
import { InscriptiondocumentsComponent } from './EspaceClient/inscriptiondocuments/inscriptiondocuments.component';
import { BoursedocumentsComponent } from './EspaceClient/boursedocuments/boursedocuments.component';
import { OrientationComponent } from './EspaceClient/orientation/orientation.component';
import { AdmindashboardComponent } from './Admin/admindashboard/admindashboard.component';
import { AddclientComponent } from './Admin/addclient/addclient.component';
import { ManagedoucmentsComponent } from './Admin/managedoucments/managedoucments.component';
import { ClientaccessComponent } from './Admin/clientaccess/clientaccess.component';
import { ManagePaymentComponent } from './Admin/manage-payment/manage-payment.component';
//Services
import { LicenceComponent } from './services/licence/licence.component';
import { MasterComponent } from './services/master/master.component';
import { MedecineComponent } from './services/medecine/medecine.component';

//Password Recovery 
import { VerifyemailComponent } from './PasswordRecovery/verifyemail/verifyemail.component';
import { CodeComponent } from './PasswordRecovery/code/code.component';
import { NewpasswordComponent } from './PasswordRecovery/newpassword/newpassword.component';

const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { showNavbar: false, showSidebar: false, showFooter: false } },
  { path: 'accueil', component: AccueilComponent, data: { showNavbar: true, showSidebar: false, showFooter: true } },
  { path: 'contact', component: ContactComponent, data: { showNavbar: true, showSidebar: false, showFooter: true } },
  { path: 'feedback', component: FeedbackComponent, data: { showNavbar: true, showSidebar: false, showFooter: true } },
  { path: 'licence', component: LicenceComponent, data: { showNavbar: true, showSidebar: false, showFooter: true } },
  { path: 'master', component: MasterComponent, data: { showNavbar: true, showSidebar: false, showFooter: true } },
  { path: 'medecine', component: MedecineComponent, data: { showNavbar: true, showSidebar: false, showFooter: true } },

  { path: 'verifyemail', component: VerifyemailComponent, data: { showNavbar: false, showSidebar: false, showFooter: false } },
  { path: 'code', component: CodeComponent, data: { showNavbar: false, showSidebar: false, showFooter: false } },
  { path: 'newpassword' , component: NewpasswordComponent ,data: { showNavbar: false, showSidebar: false, showFooter: false } },


  {path:'admindashboard' , component:AdmindashboardComponent, data: { showNavbar: false, showSidebar: false, showFooter: false } },
  {path:'ajouterclient' , component:AddclientComponent, data: { showNavbar: false, showSidebar: false, showFooter: false } },
  {path:'documents' , component:ManagedoucmentsComponent, data: { showNavbar: false, showSidebar: false, showFooter: false } },
  {path:'adminpaiement' , component:ManagePaymentComponent, data: { showNavbar: false, showSidebar: false, showFooter: false } },
  {path:'access' , component:ClientaccessComponent, data: { showNavbar: false, showSidebar: false, showFooter: false } },

  
  { 
    path: 'dashboard', 
    component: SidebarComponent,  
    children: [
      { path: '', redirectTo: '/dashboard/niveau', pathMatch: 'full' } ,
      { path: 'niveau', component: DashboardnIveauComponent } ,
      { path: 'documents' , component:DocumentsComponent},
      { path: 'documents/Visa', component: VisadocumentsComponent },
      { path: 'documents/Incription', component: InscriptiondocumentsComponent },
      { path: 'documents/Bourse', component: BoursedocumentsComponent },  
      { path: 'paiement' , component:PaiementComponent},
      { path: 'profile' , component:ProfileComponent},
      { path: 'orientation' , component:OrientationComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
