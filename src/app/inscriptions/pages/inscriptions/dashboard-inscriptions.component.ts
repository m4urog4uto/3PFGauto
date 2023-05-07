import { Component } from '@angular/core';
import { InscriptionsService } from '../../services/inscriptions.service';
import { Subject, takeUntil } from 'rxjs';
import { Inscription } from 'src/app/core/models';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormInscriptionComponent } from '../../components/ModalFormInscriptions/modal-form-inscriptions.component';

@Component({
  selector: 'app-dashboard-inscriptions',
  templateUrl: './dashboard-inscriptions.component.html',
  styleUrls: ['./dashboard-inscriptions.component.css']
})
export class DashboardInscriptionsComponent {
  inscriptions: Inscription[] = [];
  destroyed$ = new Subject<void>();

  constructor(
    private inscriptionsService: InscriptionsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialogService: MatDialog
  ) {
    this.inscriptionsService.getInscriptionsList()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((inscriptions) => this.inscriptions = inscriptions);
  }

  addInscriptionForm(): void {
    const dialogo = this.dialogService.open(ModalFormInscriptionComponent, {
      data: {
        inscription: {
          commission: '',
          courseName: '',
          mentors: [],
          students: []
        }
      }
    });

    dialogo.afterClosed().subscribe(result => {
      console.log(result);
      if (result.courseName) {
        const newStudent = { ...result, id: this.inscriptions.length + 1 }
        this.inscriptions = [ ...this.inscriptions, newStudent ];
        this.inscriptionsService.updateInscriptionsList(this.inscriptions);
      }
    });
  }

  editInscription(id: number): void {
    const inscriptionId = this.inscriptions.find((obj) => obj.id === id);
    if (inscriptionId) {
      const { id, commission, courseName, mentors, students } = inscriptionId;
      const dialogo = this.dialogService.open(ModalFormInscriptionComponent, {
        data: {
          inscription: {
            id,
            commission,
            courseName,
            mentors,
            students
          }
        }
      });

      dialogo.afterClosed().subscribe((result: Inscription) => {
        if (result) {
          const newAlumnosList = this.inscriptions.map(obj => {
            if (obj.id === result.id) {
              return { ...obj, ...result }
            }
            return obj;
          })
          this.inscriptions = [ ...newAlumnosList ];
          this.inscriptionsService.updateInscriptionsList(this.inscriptions);
        }
      });
    }
  }

  removeInscription(id: number): void {
    const inscriptionId = this.inscriptions.findIndex((obj) => obj.id === id);
    if (inscriptionId > -1) {
      this.inscriptions.splice(inscriptionId, 1);
    };

    this.inscriptions = [ ...this.inscriptions ];
    this.inscriptionsService.updateInscriptionsList(this.inscriptions);
  }

  detailInscription(comnission: number): void {
    this.router.navigate([comnission], {
      relativeTo: this.activatedRoute
    })
  }
}
