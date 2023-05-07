import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardStudentsComponent } from './students/pages/dashboard-students/dashboard-students.component';
import { DashboardCoursesComponent } from './courses/pages/dashboard-courses/dashboard-courses.component';
import { DetailsStudentsComponent } from './students/pages/details-students/details-students.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardInscriptionsComponent } from './inscriptions/pages/inscriptions/dashboard-inscriptions.component';
import { InscriptionsDetailComponent } from './inscriptions/pages/inscriptions-detail/inscriptions-detail.component';
import { LoginGuard } from './auth/guards/login.guard';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [LoginGuard],
    component: AuthComponent,
    loadChildren: () => import('./auth/auth.module').then((a) => a.AuthModule) 
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    loadChildren: () => import('./dashboard/dashboard.module').then((d) => d.DashboardModule)
  },
  {
    path: '**',
    redirectTo: 'auth',
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
