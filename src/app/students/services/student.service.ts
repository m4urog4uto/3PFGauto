import { Injectable } from '@angular/core';
import { Student } from '../../core/models';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { CoursesService } from '../../courses/services/courses.service';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private courses$: Observable<string[]>;

  private students$ = new BehaviorSubject<Student[]>([]);

  constructor(
    private coursesService: CoursesService,
    private httpClient: HttpClient
  ) {
    this.courses$ = this.coursesService.getCoursesList().pipe(
      map((courses) => courses.map((course) => course.courseName))
    );
    this.httpClient.get<Student[]>(`${enviroment.apiBaseUrl}/students`)
      .subscribe({
        next: (students) => {
          this.students$.next(students);
        }
      })
  }

  updateStudentList(students: Student[]): void {
    this.students$.next(students);
  }

  getListOfCourses(): Observable<string[]> {
    return this.courses$;
  }

  getStudentList(): Observable<Student[]> {
    return this.students$.asObservable();
  }

  getStudentDetail(id: number): Observable<Student | undefined> {
    return this.students$.asObservable()
      .pipe(
        map((students: Student[]) => students.find((student) => student.id === id))
      )
  }
}
