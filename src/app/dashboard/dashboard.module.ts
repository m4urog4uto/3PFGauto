import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DashboardCoursesComponent } from '../courses/pages/dashboard-courses/dashboard-courses.component';
import { InscriptionsDetailComponent } from '../inscriptions/pages/inscriptions-detail/inscriptions-detail.component';
import { DashboardInscriptionsComponent } from '../inscriptions/pages/inscriptions/dashboard-inscriptions.component';
import { DashboardStudentsComponent } from '../students/pages/dashboard-students/dashboard-students.component';
import { DetailsStudentsComponent } from '../students/pages/details-students/details-students.component';

const routes: Routes = [
  {
    path: 'alumnos',
    children: [
      {
        path: '',
        component: DashboardStudentsComponent
      },
      {
        path: ':studentId',
        component: DetailsStudentsComponent
      }
    ]
  },
  {
    path: 'inscripciones',
    children: [
      {
        path: '',
        component: DashboardInscriptionsComponent
      },
      {
        path: ':commission',
        component: InscriptionsDetailComponent
      }
    ]
  },
  {
    path: 'cursos',
    children: [
      {
        path: '',
        component: DashboardCoursesComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'alumnos'
  }
]

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class DashboardModule { }
