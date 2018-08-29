import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AuthGuardService as AuthGuard, AuthGuardService } from './services/auth-guard/auth-guard.service';
import { AdminService as AdminGuard, AdminService } from './services/admin/admin.service';
import { DateService } from './services/date/date.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CommonModule } from '@angular/common';
import { SetupComponent } from './components/setup/setup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavComponent } from './components/nav/nav.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { PatientsComponent } from './components/patients/patients.component';
import { CreatePatientComponent } from './components/create-patient/create-patient.component';
import { EditPatientComponent } from './components/edit-patient/edit-patient.component';
import { UsersComponent } from './components/users/users.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ResultsComponent } from './components/results/results.component';
import { TestComponent } from './components/test/test.component';
import { ResultComponent } from './components/result/result.component';
import { PatientResultsComponent } from './components/patient-results/patient-results.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'setup', component: SetupComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'patient/list', component: PatientsComponent, canActivate: [AuthGuard] },
  { path: 'patient/create', component: CreatePatientComponent, canActivate: [AuthGuard] },
  { path: 'patient/edit/:id', component: EditPatientComponent, canActivate: [AuthGuard] },
  { path: 'user/list', component: UsersComponent, canActivate: [AdminGuard] },
  { path: 'user/create', component: CreateUserComponent, canActivate: [AuthGuard] },
  { path: 'result/list', component: ResultsComponent, canActivate: [AuthGuard] },
  { path: 'diagnosis/run', component: TestComponent, canActivate: [AuthGuard] },
  { path: 'result/patient/:patient_id', component: PatientResultsComponent, canActivate: [AuthGuard] },
  { path: 'diagnosis/result/:test_id', component: ResultComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SetupComponent,
    DashboardComponent,
    NavComponent,
    SideMenuComponent,
    PatientsComponent,
    CreatePatientComponent,
    EditPatientComponent,
    UsersComponent,
    CreateUserComponent,
    ResultsComponent,
    TestComponent,
    ResultComponent,
    PatientResultsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })
  ],
  providers: [AuthGuardService, DateService, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
