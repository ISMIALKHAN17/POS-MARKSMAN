import { FutsalComponent } from './components/futsal/futsal.component';
import { LoginComponent } from './components/login/login.component';
import { AdduserComponent } from './components/adduser/adduser.component';
import { ReportsComponent } from './components/reports/reports.component';
import { BadmintonComponent } from './components/badminton/badminton.component';
import { GelBlasterComponent } from './components/gel-blaster/gel-blaster.component';
import { IndoorCricketComponent } from './components/indoor-cricket/indoor-cricket.component';
import { PaintballComponent } from './components/paintball/paintball.component';
import { UserComponent } from './components/user/user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { AllBookingsComponent } from './components/all-bookings/all-bookings.component';
import { AirsoftRangeComponent } from './components/airsoft-range/airsoft-range.component';
import { ArcheryFinalComponent } from './components/archery-final/archery-final.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user', component: UserComponent },
  { path: 'Paintball', component: PaintballComponent },
  { path: 'Indoor-cricket', component: IndoorCricketComponent },
  { path: 'Gel-Blaster', component: GelBlasterComponent },
  { path: 'Badminton', component: BadmintonComponent },
  { path: 'Reports', component: ReportsComponent },
  { path: 'Add-User', component: AdduserComponent },
  { path: 'Login', component: UserLoginComponent },
  { path: 'Futsal', component: FutsalComponent },
  { path: 'all-bookings', component: AllBookingsComponent },
  { path: 'reports', component: ReportsComponent},
  { path: 'airsoft', component: AirsoftRangeComponent},
  { path: 'archery', component: ArcheryFinalComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
