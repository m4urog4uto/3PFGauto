import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardStudentsComponent } from './pages/dashboard-students/dashboard-students.component';
import { DetailsStudentsComponent } from './pages/details-students/details-students.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared.module';

import { PipesModule } from '../shared/pipes/pipes.module';
import { DirectivesModule } from '../shared/directives/directives.module';

import { TableStudentComponent } from './components/TableStudent/table-student.component';
import { ModalFormStudentComponent } from './components/ModalFormStudent/modal-form-student.component';
import { TableCoursesSelected } from './components/TableCoursesSelected/table-courses-selected.component';


@NgModule({
  declarations: [
    DashboardStudentsComponent,
    DetailsStudentsComponent,
    TableStudentComponent,
    ModalFormStudentComponent,
    TableCoursesSelected
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    PipesModule,
    DirectivesModule
  ],
  exports: [
    DashboardStudentsComponent,
    DetailsStudentsComponent
  ]
})
export class StudentsModule { }
