import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { Inscription, Student } from '../../core/models';
import { CoursesService } from '../../courses/services/courses.service';
import { StudentService } from '../../students/services/student.service';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {

  private courses$: Observable<string[]>;

  private inscriptions$ = new BehaviorSubject<Inscription[]>([])

  private inscriptionsStudentsList$: Observable<string[]>;

  private inscriptionsMentors$ = new BehaviorSubject<string[] | null>(null);

  constructor(
    private httpClient: HttpClient,
    private coursesService: CoursesService,
    private studentService: StudentService
  ) {
    this.courses$ = this.coursesService.getCoursesList()
      .pipe(
        map((courses) => courses.map((course) => course.courseName))
      )

    this.inscriptionsStudentsList$ = this.studentService.getStudentList()
      .pipe(
        map((students: Student[]) => students.map((student) => `${student.name} ${student.surname}`))
      )
  
    this.httpClient.get<string[]>(`${enviroment.apiBaseUrl}/mentors`)
      .subscribe({
        next: (mentors) => {
          this.inscriptionsMentors$.next(mentors);
        }
      })

    this.httpClient.get<Inscription[]>(`${enviroment.apiBaseUrl}/inscriptions`)
      .subscribe({
        next: (inscriptions) => {
          this.inscriptions$.next(inscriptions);
        }
      })
  }

  updateInscriptionsList(inscriptions: Inscription[]): void {
    this.inscriptions$.next(inscriptions);
  }

  getInscriptionsList(): Observable<Inscription[]> {
    return this.inscriptions$.asObservable();
  }

  getInscriptionDetail(commission: number): Observable<Inscription | undefined> {
    return this.inscriptions$.asObservable()
      .pipe(
        map((inscriptions: Inscription[]) => inscriptions.find((inscription) => inscription.commission === commission))
      )
  }

  getInscriptionsStudents(): Observable<string[]> {
    return this.inscriptionsStudentsList$;
  }

  getInscriptionsMentors(): Observable<string[] | null> {
    return this.inscriptionsMentors$.asObservable();
  }

  getListOfCourses(): Observable<string[]> {
    return this.courses$;
  }
}
