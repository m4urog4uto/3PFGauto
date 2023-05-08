import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { StudentsComponent } from '../students/students.component';
import { InscriptionsComponent } from '../inscriptions/inscriptions.component';
import { CoursesComponent } from '../courses/courses.component';
import { DirectorGuard } from '../shared/guards/director.guard';

const routes: Routes = [
  {
    path: 'alumnos',
    component: StudentsComponent,
    loadChildren: () => import('../students/students.module').then((s) => s.StudentsModule)
  },
  {
    path: 'inscripciones',
    component: InscriptionsComponent,
    canActivate: [DirectorGuard],
    loadChildren: () => import('../inscriptions/inscriptions.module').then((i) => i.InscriptionsModule)
  },
  {
    path: 'cursos',
    component: CoursesComponent,
    canActivate: [DirectorGuard],
    loadChildren: () => import('../courses/courses.module').then((c) => c.CoursesModule)
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
