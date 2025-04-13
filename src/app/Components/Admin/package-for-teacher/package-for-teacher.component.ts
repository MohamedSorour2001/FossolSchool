import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs';
import { AppDataService } from 'src/app/Services/app-data.service';

@Component({
  selector: 'app-package-for-teacher',
  templateUrl: './package-for-teacher.component.html',
  styleUrls: ['./package-for-teacher.component.css']
})
export class PackageForTeacherComponent {
  levels:any[]=[];
  grades:any[]=[];
  subjects:any[]=[];

  addClassForm:FormGroup
    constructor(private db: FormBuilder, private Router: Router, private _AppDataService: AppDataService) {
      this.addClassForm = db.group({
        name: ['', [Validators.required]],
        levelId: ['', [Validators.required]],
        gradeId: ['', [Validators.required]]
      })

      this.addClassForm.get('levelId')?.valueChanges.pipe(
        distinctUntilChanged()
      ).subscribe((value) => {
        console.log(value)
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

    GetGrades() {
      const levelId = this.addClassForm.get('levelId')?.value;
      if (levelId) {
        this._AppDataService.GetGradeByLevelId(levelId).subscribe({
          next: (response) => {
            console.log(response.data)
            this.grades = response.data;
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
          }
        });
      }
    }
    GetSubjectss() {
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


    ngOnInit(): void {
      this.GetLevels()
    }


    Submit() {
      console.log(this.addClassForm.value)
      if (this.addClassForm.valid) {
        this._AppDataService.AddSubject(this.addClassForm.value).subscribe({
          next: (response) => {
            console.log(response)
            if (response.error == null) {
              console.log('Grade Added Successfuly')
            }
          },
          error: (err: HttpErrorResponse) => {
            console.log(err.error.message)
          }
        })
      }
    }





































  region: string = '';
  stages: { id: string; name: string; selected: boolean }[] = [
    { id: 'high-school', name: 'المرحلة الثانوية', selected: false },
    { id: 'middle-school', name: 'المرحلة المتوسطة', selected: false },
    { id: 'elementary-school', name: 'المرحلة الابتدائية', selected: false },
  ];

  onRegionChange(event: any): void {
    this.region = event.target.value;
  }

  toggleStage(stageId: string): void {
    const stage = this.stages.find(stage => stage.id === stageId);
    if (stage) stage.selected = !stage.selected;
  }
}
