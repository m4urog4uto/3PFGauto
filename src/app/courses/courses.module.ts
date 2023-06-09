import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardCoursesComponent } from './pages/dashboard-courses/dashboard-courses.component';
import { ModalFormCourseComponent } from './components/ModalFormCourse/modal-form-course.component';
import { TableCourseComponent } from './components/TableCourse/table-course.component';
import { CoursesComponent } from './courses.component';

import { SharedModule } from '../shared/shared.module';
import { DirectivesModule } from '../shared/directives/directives.module';
import { MaterialModule } from '../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../shared/pipes/pipes.module';
import { RouterModule, Routes } from '@angular/router';
import { DetailsCoursesComponent } from './pages/details-courses/details-courses.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardCoursesComponent
  },
  {
    path: ':courseId',
    component: DetailsCoursesComponent
  }
]

@NgModule({
  declarations: [
    DashboardCoursesComponent,
    ModalFormCourseComponent,
    TableCourseComponent,
    CoursesComponent,
    DetailsCoursesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    DirectivesModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class CoursesModule { }
