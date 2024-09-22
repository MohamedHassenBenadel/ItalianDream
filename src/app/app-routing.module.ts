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


const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { showNavbar: false, showSidebar: false, showFooter: false } },
  { path: 'accueil', component: AccueilComponent, data: { showNavbar: true, showSidebar: false, showFooter: true } },
  { path: 'contact', component: ContactComponent, data: { showNavbar: true, showSidebar: false, showFooter: true } },
  { path: 'feedback', component: FeedbackComponent, data: { showNavbar: true, showSidebar: false, showFooter: true } },
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
