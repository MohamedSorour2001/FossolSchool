import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs';
import { AppDataService } from 'src/app/Services/app-data.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {

  levels: any[] = [];
  grades: any[] = [];
  subjects: any[] = [];
  lessons: any[] = [];

  ShowAddAcademinTerm: boolean = false;
  ShowEditAcademinTerm: boolean = false;

  addClassForm: FormGroup;

  constructor(
    private db: FormBuilder,
    private Router: Router,
    private _AppDataService: AppDataService
  ) {
    this.addClassForm = db.group({
      name: ['', [Validators.required]],
      levelId: ['', [Validators.required]],
      gradeId: ['', [Validators.required]],
      subjectId: ['', [Validators.required]]
    });

    this.addClassForm.get('levelId')?.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(() => {
      this.GetGrades();
    });

    this.addClassForm.get('gradeId')?.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe((gradeId) => {
      if (gradeId) {
        this.GetSubjects();
      }
    });
  }

  get name() {
    return this.addClassForm.get("name");
  }
  get levelId() {
    return this.addClassForm.get("levelId");
  }
  get gradeId() {
    return this.addClassForm.get("gradeId");
  }
  get subjectId() {
    return this.addClassForm.get("subjectId");
  }

  Toggle() {
    this.ShowAddAcademinTerm = !this.ShowAddAcademinTerm;
  }

  ToggleEdit() {
    this.ShowEditAcademinTerm = !this.ShowEditAcademinTerm;
  }

  GetLevels() {
    this._AppDataService.GetAllLevels().subscribe({
      next: (response) => {
        this.levels = response.data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  GetGrades() {
    const levelId = this.addClassForm.get('levelId')?.value;
    if (levelId) {
      this._AppDataService.GetGradeByLevelId(levelId).subscribe({
        next: (response) => {
          this.grades = response.data;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      });
    }
  }

  GetSubjects() {
    const gradeId = this.addClassForm.get('gradeId')?.value;
    if (gradeId) {
      this._AppDataService.GetSubjectByGradelId(gradeId).subscribe({
        next: (response) => {
          this.subjects = response.data;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      });
    }
  }
  GetLessons() {
    this._AppDataService.GetAllLessons().subscribe({
      next: (response) => {
        this.lessons = response.data;
        console.log(this.lessons);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    })
  }

  deleteLesson(id: any) {
    this._AppDataService.DeleteLesson(id).subscribe({
      next: (response) => {
        window.console.warn('Lesson Deleted Successfully!');
        this.GetLessons()
      }, error: (err: HttpErrorResponse) => {
        console.log(err)
      }
    })
  }

  ngOnInit(): void {
    this.GetLevels();
    this.GetLessons();
  }

  Submit() {
    if (this.addClassForm.valid) {
      const apiPayload = {
        title: this.name?.value,
        subjectId: this.subjectId?.value
      };
      this._AppDataService.AddLesson(apiPayload).subscribe({
        next: (response) => {
          if (response.error == null) {
            window.console.warn('Lesson Added Successfully!');
            this.ShowAddAcademinTerm = false;
            this.GetLessons();
            this.addClassForm.reset();
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error.message)
        }
      }
      )
    }
  }
}
