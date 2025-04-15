import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppDataService } from 'src/app/Services/app-data.service';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent {
  addClass: boolean = false;
  classes: any[] = [];
  levels: any[] = [];
  grades: any[] = [];

  addClassForm: FormGroup
  constructor(private db: FormBuilder, private Router: Router, private _AppDataService: AppDataService) {
    this.addClassForm = db.group({
      name: ['', [Validators.required]],
      levelId: ['', [Validators.required]],
      gradeId: ['', [Validators.required]]
    });
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
    this.addClass = !this.addClass
  }
  GoToClassStudent(id: any) {
    this.Router.navigate(['classStudent', id])
  }

  GetClasses() {
    this._AppDataService.GetAllClasss().subscribe({
      next: (response) => {
        this.classes = response.data
      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
      }
    })
  }
  GetGrades() {
    const levelId = this.addClassForm.get('levelId')?.value;
    if (levelId) {
      this._AppDataService.GetGradeByLevelId(levelId).subscribe({
        next: (response) => {
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

  deleteClass(id: any) {
    this._AppDataService.DeleteClass(id).subscribe({
      next: (response) => {
        window.console.warn('Class Deleted Successfully!');
        this.GetClasses()
      }, error: (err: HttpErrorResponse) => {
        console.log(err)
      }
    })
  }

  ngOnInit(): void {
    this.GetClasses()
    this.GetLevels()
  }

  Submit() {
    if (this.addClassForm.valid) {
      const apiPayload = {
        name: this.addClassForm.get('name')?.value,
        gradeId: this.addClassForm.get('gradeId')?.value
      };
      if (apiPayload != null) {
        this._AppDataService.AddClass(apiPayload).subscribe({
          next: (response) => {
            if (response.error == null) {
              window.console.warn('Class Added Successfully!');
              this.addClassForm.reset()
              this.addClass = false;
            }
          },
          error: (err: HttpErrorResponse) => {
            console.log(err.error.message)
          }
        })
      }
    }
  }

}
