import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '../../core/models';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private courses$ = new BehaviorSubject<Course[]>([])

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<Course[]>(`${enviroment.apiBaseUrl}/courses`)
      .subscribe({
        next: (courses) => {
          this.courses$.next(courses);
        }
      })
  }

  updateCourseList(courses: Course[]): void {
    this.courses$.next(courses);
  }

  getCoursesList(): Observable<Course[]> {
    return this.courses$.asObservable();
  }
}
