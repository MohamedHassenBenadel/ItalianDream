import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';



import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule} from '@angular/material/select';

import { MatTabsModule } from '@angular/material/tabs';


import { MatTableModule } from '@angular/material/table';



import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CountUpModule } from 'ngx-countup';




import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccueilComponent } from './accueil/accueil.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
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






@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AccueilComponent,
    LoginComponent,
    FooterComponent,
    ContactComponent,
    SidebarComponent,
    DashboardnIveauComponent,
    DocumentsComponent,
    PaiementComponent,
    FeedbackComponent,
    ProfileComponent,
    VisadocumentsComponent,
    InscriptiondocumentsComponent,
    BoursedocumentsComponent,
    OrientationComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    BrowserAnimationsModule,
    CountUpModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatTableModule,
    FormsModule,
    MatStepperModule
    
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  bootstrap: [AppComponent], providers: [provideAnimationsAsync()]
})
export class AppModule { }
