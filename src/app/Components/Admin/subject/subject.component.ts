import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs';
import { AppDataService } from 'src/app/Services/app-data.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent {

  levels: any[] = [];
  grades: any[] = [];
  subjects: any[] = [];
  ShowAddAcademinTerm: boolean = false;
  ShowEditAcademinTerm: boolean = false;
  addClassForm: FormGroup
  constructor(private db: FormBuilder, private Router: Router, private _AppDataService: AppDataService) {
    this.addClassForm = db.group({
      name: ['', [Validators.required]],
      levelId: ['', [Validators.required]],
      gradeId: ['', [Validators.required]]
    })
    this.addClassForm.get('levelId')?.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe((value) => {
      this.GetGrades();
    });
  }

  get name() {
    return this.addClassForm.get("name")
  }
  get levelId() {
    return this.addClassForm.get("levelId")
  }
  get gradeId() {
    return this.addClassForm.get("gradeId")
  }

  Toggle() {
    this.ShowAddAcademinTerm = !this.ShowAddAcademinTerm
  }
  ToggleEdit() {
    this.ShowEditAcademinTerm = !this.ShowEditAcademinTerm
  }

  GetGrades() {
    const levelId = this.addClassForm.get('levelId')?.value;
    if (levelId) {
      this._AppDataService.GetGradeByLevelId(levelId).subscribe({
        next: (response) => {
          // const GradesInLevel = response.filter((c: any) => c.levelId==levelId);
          console.log(response.data)
          this.grades = response.data;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err)
        }
      });
    }
  }
  GetLevels() {
    this._AppDataService.GetAllLevels().subscribe({
      next: (response) => {
        this.levels = response.data
      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
      }
    })
  }
  GetSubjects() {
    this._AppDataService.GetAllSubjects().subscribe({
      next: (response) => {
        this.subjects = response.data
        console.log(this.subjects)
      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
      }
    })
  }

  deleteSubject(id: any) {
    this._AppDataService.DeleteSubject(id).subscribe({
      next: (response) => {
        window.console.warn('Subject Deleted Successfully!');
        this.GetSubjects()
      }, error: (err: HttpErrorResponse) => {
        console.log(err)
      }
    })
  }

  ngOnInit(): void {
    this.GetSubjects()
    this.GetLevels()
  }


  Submit() {
    if (this.addClassForm.valid) {
      this._AppDataService.AddSubject(this.addClassForm.value).subscribe({
        next: (response) => {
          console.log(response)
          if (response.error == null) {
            window.console.warn('Subject Added Successfully!');
            this.ShowAddAcademinTerm = false;
            this.GetSubjects()
            this.addClassForm.reset()
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error.message)
        }
      })
    }
  }

}
