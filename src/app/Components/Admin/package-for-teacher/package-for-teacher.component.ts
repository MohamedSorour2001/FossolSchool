import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs';
import { AppDataService } from 'src/app/Services/app-data.service';

@Component({
  selector: 'app-package-for-teacher',
  templateUrl: './package-for-teacher.component.html',
  styleUrls: ['./package-for-teacher.component.css']
})
export class PackageForTeacherComponent {
  TeacherId: string;
  levels: any[] = [];
  grades: any[] = [];
  subjects: any[] = [];
  AcademicTerms: any[] = [];
  selectedLevelsForForm: any[] = [];
  selectedGradesForForm: any[] = [];
  selectedSubjectsForForm: any[] = [];
  selectedAcademicTermForForm: any[] = [];
  selectedLevels: Set<number> = new Set();
  selectedGrades: Set<number> = new Set();

  addClassForm: FormGroup
  constructor(private db: FormBuilder, private route: ActivatedRoute, private Router: Router, private _AppDataService: AppDataService) {
    this.TeacherId = this.route.snapshot.params['id'];
    this.addClassForm = db.group({
      teacherId: [this.TeacherId, [Validators.required]],
      gradeIds: [[], [Validators.required]],
      subjectIds: [[], [Validators.required]],
      academicTermIds: [[], [Validators.required]]
    });

    this.addClassForm.get('levelId')?.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe((value) => {
      console.log(value)
    });
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
  GetAcademicTerms() {
    this._AppDataService.GetAllAcademicTerms().subscribe({
      next: (response) => {
        this.AcademicTerms = response.data
      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
      }
    })
  }


  onLevelChange(levelId: number, event: Event): void {
    const target = event.target as HTMLInputElement;
    const isChecked = target.checked;

    if (isChecked) {
      this.selectedLevels.add(levelId);
      this._AppDataService.GetGradeByLevelId(levelId).subscribe({
        next: (response) => {
          this.grades = [...this.grades, ...response.data];
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      });
    } else {
      this.selectedLevels.delete(levelId);
      this.grades = this.grades.filter((grade) => grade.levelId !== levelId);
    }
  }


  onGradeChange(gradeId: number, event: Event): void {
    const target = event.target as HTMLInputElement;
    const isChecked = target.checked;
    if (isChecked) {
      this.selectedGrades.add(gradeId);
      this._AppDataService.GetSubjectByGradelId(gradeId).subscribe({
        next: (response) => {
          this.subjects = [...this.subjects, ...response.data];
          console.log(this.subjects)
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      });
    } else {
      this.selectedGrades.delete(gradeId);
      this.subjects = this.subjects.filter((subject) => subject.gradeId !== gradeId);
    }
  }



  onSelectLevelMultipleAnswer(event: any, level: any) {
    if (event.target.checked) {
      this.selectedLevelsForForm.push(level.id);
    } else {
      this.selectedLevelsForForm = this.selectedLevelsForForm.filter((a) => a.id !== level.id);
    }
  }
  onSelectGradeMultipleAnswer(event: any, grade: any) {
    if (event.target.checked) {
      this.selectedGradesForForm.push(grade.id);
    } else {
      this.selectedGradesForForm = this.selectedGradesForForm.filter((a) => a.id !== grade.id);
    }
  }
  onSelectSubjectMultipleAnswer(event: any, subject: any) {
    if (event.target.checked) {
      this.selectedSubjectsForForm.push(subject.id);
    } else {
      this.selectedSubjectsForForm = this.selectedSubjectsForForm.filter((a) => a.id !== subject.id);
    }
  }
  onSelectAcademicTermMultipleAnswer(event: any, AcademicTerm: any) {
    if (event.target.checked) {
      this.selectedAcademicTermForForm.push(AcademicTerm.id);
    } else {
      this.selectedAcademicTermForForm = this.selectedAcademicTermForForm.filter((a) => a.id !== AcademicTerm.id);
    }
  }

  ngOnInit(): void {
    this.GetLevels()
    this.GetAcademicTerms()
  }

  Submit() {
    const apiPayload = {
      teacherId: this.TeacherId,
      gradeIds: this.selectedGradesForForm,
      subjectIds: this.selectedSubjectsForForm,
      academicTermIds: this.selectedAcademicTermForForm
    };
    console.log(apiPayload)
    // if (this.addClassForm.valid) {
      this._AppDataService.AddTeacherDetails(apiPayload).subscribe({
        next: (response) => {
          if (response.error == null) {
            console.log('Teacher Details Added Successfuly')
            this.addClassForm.reset();
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error.message)
        }
      }
    )
    // }
  }

  get teacherId() {
    return this.addClassForm.get('teacherId');
  }
  get gradeIds() {
    return this.addClassForm.get('gradeIds');
  }
  get subjectIds() {
    return this.addClassForm.get('subjectIds');
  }
  get academicTermIds() {
    return this.addClassForm.get('academicTermIds');
  }

}
