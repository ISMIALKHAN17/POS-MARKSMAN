import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FaIconLibrary,FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';
import { PaintballComponent } from './components/paintball/paintball.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, FormGroup,ReactiveFormsModule  } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { IndoorCricketComponent } from './components/indoor-cricket/indoor-cricket.component';
import { GelBlasterComponent } from './components/gel-blaster/gel-blaster.component';
import { BadmintonComponent } from './components/badminton/badminton.component';
import { ReportsComponent } from './components/reports/reports.component';
import { AdduserComponent } from './components/adduser/adduser.component';
import { LoginComponent } from './components/login/login.component';
import { FutsalComponent } from './components/futsal/futsal.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';
import { AllBookingsComponent } from './components/all-bookings/all-bookings.component';
import { SearchFilterPipe } from './pipe/search-filter.pipe';
import { AirsoftRangeComponent } from './components/airsoft-range/airsoft-range.component';
import { ArcheryFinalComponent } from './components/archery-final/archery-final.component';
import { fas } from '@fortawesome/free-solid-svg-icons';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    UserComponent,
    PaintballComponent,
    HeaderComponent,
    IndoorCricketComponent,
    GelBlasterComponent,
    BadmintonComponent,
    ReportsComponent,
    AdduserComponent,
    LoginComponent,
    FutsalComponent,
    UserLoginComponent,
    MainDashboardComponent,
    AllBookingsComponent,
    SearchFilterPipe,
    AirsoftRangeComponent,
    ArcheryFinalComponent,
    


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    NgbModalModule,
    





  ],

  providers: [
    DatePipe
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
