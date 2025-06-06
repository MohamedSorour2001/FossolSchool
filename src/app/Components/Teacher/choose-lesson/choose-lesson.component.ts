import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs';
import { AppDataService } from 'src/app/Services/app-data.service';

@Component({
  selector: 'app-choose-lesson',
  templateUrl: './choose-lesson.component.html',
  styleUrls: ['./choose-lesson.component.css']
})
export class ChooseLessonComponent implements OnInit {

  // Data arrays for each entity.
  levels: any[] = [];
  grades: any[] = [];
  subjects: any[] = [];
  lessons: any[] = [];
  lessonFiles: any[] = [];
  lessonData: any;
  showLessonData: boolean = false;
  ShowAddFileToLesson: boolean = false;

  // Arrays used to show a carousel “window” of 3 items.
  visibleLevels: any[] = [];
  visibleGrades: any[] = [];
  visibleSubjects: any[] = [];
  visibleLessons: any[] = [];

  // Separate carousel indexes.
  currentLevelIndex: number = 0;
  currentGradeIndex: number = 0;
  currentSubjectIndex: number = 0;
  currentLessonIndex: number = 0;

  // The form now includes separate selections for subject and lesson.
  addClassForm: FormGroup;
  addFileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _AppDataService: AppDataService
  ) {
    // Notice we include both subjectId and lessonId.
    this.addClassForm = fb.group({
      name: ['', [Validators.required]],
      levelId: ['', [Validators.required]],
      gradeId: ['', [Validators.required]],
      subjectId: ['', [Validators.required]],
      lessonId: ['', [Validators.required]]
    });
    this.addFileForm = fb.group({
      Files: fb.array([], Validators.required)
    });

    // When level changes, fetch the corresponding grades.
    this.addClassForm.get('levelId')?.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(() => {
      this.GetGrades();
    });

    // When grade changes, fetch the corresponding subjects.
    this.addClassForm.get('gradeId')?.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(() => {
      this.GetSubjects();
    });

    // When subject changes, fetch the corresponding lessons.
    this.addClassForm.get('subjectId')?.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(() => {
      this.GetLessons();
    });
  }

  // Convenience getters.
  get name() { return this.addClassForm.get("name"); }
  get levelId() { return this.addClassForm.get("levelId"); }
  get gradeId() { return this.addClassForm.get("gradeId"); }
  get subjectId() { return this.addClassForm.get("subjectId"); }
  get lessonId() { return this.addClassForm.get("lessonId"); }
  get Files(): FormArray {
    return this.addFileForm.get('Files') as FormArray;
  }



  ngOnInit(): void {
    this.GetLevels();
  }

  // Fetch all levels.
  GetLevels() {
    this._AppDataService.GetAllLevels().subscribe({
      next: (response) => {
        this.levels = response.data;
        this.updateVisibleLevels();
        // Optionally, fetch grades for an initial level.
        this.GetGrades();
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
      }
    });
  }

  // Fetch grades based on the selected level.
  GetGrades() {
    const selectedLevelId = this.addClassForm.get('levelId')?.value;
    if (selectedLevelId) {
      this._AppDataService.GetGradeByLevelId(selectedLevelId).subscribe({
        next: (response) => {
          this.grades = response.data;
          this.currentGradeIndex = 0;
          this.updateVisibleGrades();
          // Reset subjects and lessons selections.
          this.subjects = [];
          this.visibleSubjects = [];
          this.lessons = [];
          this.visibleLessons = [];
          this.addClassForm.get('gradeId')?.setValue('');
          this.addClassForm.get('subjectId')?.setValue('');
          this.addClassForm.get('lessonId')?.setValue('');
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
        }
      });
    } else {
      this.grades = [];
      this.visibleGrades = [];
    }
  }

  // Fetch subjects based on the selected grade.
  GetSubjects() {
    const selectedGradeId = this.addClassForm.get('gradeId')?.value;
    if (selectedGradeId) {
      this._AppDataService.GetSubjectByGradelId(selectedGradeId).subscribe({
        next: (response) => {
          this.subjects = response.data;
          this.currentSubjectIndex = 0;
          this.updateVisibleSubjects();
          // Reset lessons selection.
          this.lessons = [];
          this.visibleLessons = [];
          this.addClassForm.get('subjectId')?.setValue('');
          this.addClassForm.get('lessonId')?.setValue('');
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
        }
      });
    } else {
      this.subjects = [];
      this.visibleSubjects = [];
    }
  }

  // Fetch lessons based on the selected subject.
  GetLessons() {
    const selectedSubjectId = this.addClassForm.get('subjectId')?.value;
    if (selectedSubjectId) {
      this._AppDataService.GetLessonBySubjectlId(selectedSubjectId).subscribe({
        next: (response) => {
          this.lessons = response.data;
          this.currentLessonIndex = 0;
          this.updateVisibleLessons();
          // Clear any previously selected lesson.
          this.addClassForm.get('lessonId')?.setValue('');
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
        }
      });
    } else {
      this.lessons = [];
      this.visibleLessons = [];
    }
  }

  // onLevelChange: updates the level selection.
  onLevelChange(levelId: any, event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.addClassForm.get('levelId')?.setValue(levelId);
    } else {
      this.grades = [];
      this.visibleGrades = [];
    }
  }

  // onGradeChange: updates the grade selection.
  onGradeChange(gradeId: any, event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.addClassForm.get('gradeId')?.setValue(gradeId);
    } else {
      this.subjects = [];
      this.visibleSubjects = [];
    }
  }

  // onSubjectChange: updates the subject selection.
  onSubjectChange(subjectId: any, event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.addClassForm.get('subjectId')?.setValue(subjectId);
    } else {
      this.lessons = [];
      this.visibleLessons = [];
    }
  }

  // onLessonChange: updates the lesson selection.
  onLessonChange(lessonId: any, event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.addClassForm.get('lessonId')?.setValue(lessonId);
    }
  }

  // Update visibleLevels for the levels carousel.
  updateVisibleLevels(): void {
    const totalVisible = 3;
    const itemsLength = this.levels.length;
    this.visibleLevels = [];
    if (itemsLength <= totalVisible) {
      this.visibleLevels = [...this.levels];
    } else {
      for (let i = 0; i < totalVisible; i++) {
        const index = (this.currentLevelIndex + i) % itemsLength;
        this.visibleLevels.push(this.levels[index]);
      }
    }
  }

  // Update visibleGrades for the grades carousel.
  updateVisibleGrades(): void {
    const totalVisible = 3;
    const itemsLength = this.grades.length;
    this.visibleGrades = [];
    if (itemsLength <= totalVisible) {
      this.visibleGrades = [...this.grades];
    } else {
      for (let i = 0; i < totalVisible; i++) {
        const index = (this.currentGradeIndex + i) % itemsLength;
        this.visibleGrades.push(this.grades[index]);
      }
    }
  }

  // Update visibleSubjects for the subjects carousel.
  updateVisibleSubjects(): void {
    const totalVisible = 3;
    const itemsLength = this.subjects.length;
    this.visibleSubjects = [];
    if (itemsLength <= totalVisible) {
      this.visibleSubjects = [...this.subjects];
    } else {
      for (let i = 0; i < totalVisible; i++) {
        const index = (this.currentSubjectIndex + i) % itemsLength;
        this.visibleSubjects.push(this.subjects[index]);
      }
    }
  }

  // Update visibleLessons for the lessons carousel.
  updateVisibleLessons(): void {
    const totalVisible = 3;
    const itemsLength = this.lessons.length;
    this.visibleLessons = [];
    if (itemsLength <= totalVisible) {
      this.visibleLessons = [...this.lessons];
    } else {
      for (let i = 0; i < totalVisible; i++) {
        const index = (this.currentLessonIndex + i) % itemsLength;
        this.visibleLessons.push(this.lessons[index]);
      }
    }
  }

  // Navigation for Levels carousel.
  goLevelLeft(): void {
    if (this.levels.length > 0) {
      this.currentLevelIndex = (this.currentLevelIndex - 1 + this.levels.length) % this.levels.length;
      this.updateVisibleLevels();
    }
  }
  goLevelRight(): void {
    if (this.levels.length > 0) {
      this.currentLevelIndex = (this.currentLevelIndex + 1) % this.levels.length;
      this.updateVisibleLevels();
    }
  }

  // Navigation for Grades carousel.
  goGradeLeft(): void {
    if (this.grades.length > 0) {
      this.currentGradeIndex = (this.currentGradeIndex - 1 + this.grades.length) % this.grades.length;
      this.updateVisibleGrades();
    }
  }
  goGradeRight(): void {
    if (this.grades.length > 0) {
      this.currentGradeIndex = (this.currentGradeIndex + 1) % this.grades.length;
      this.updateVisibleGrades();
    }
  }

  // Navigation for Subjects carousel.
  goSubjectLeft(): void {
    if (this.subjects.length > 0) {
      this.currentSubjectIndex = (this.currentSubjectIndex - 1 + this.subjects.length) % this.subjects.length;
      this.updateVisibleSubjects();
    }
  }
  goSubjectRight(): void {
    if (this.subjects.length > 0) {
      this.currentSubjectIndex = (this.currentSubjectIndex + 1) % this.subjects.length;
      this.updateVisibleSubjects();
    }
  }

  // Navigation for Lessons carousel.
  goLessonLeft(): void {
    if (this.lessons.length > 0) {
      this.currentLessonIndex = (this.currentLessonIndex - 1 + this.lessons.length) % this.lessons.length;
      this.updateVisibleLessons();
    }
  }
  goLessonRight(): void {
    if (this.lessons.length > 0) {
      this.currentLessonIndex = (this.currentLessonIndex + 1) % this.lessons.length;
      this.updateVisibleLessons();
    }
  }

  Toggle() {
    this.showLessonData = !this.showLessonData
  }
  AddFileToggle() {
    this.showLessonData = !this.showLessonData
    this.ShowAddFileToLesson = !this.ShowAddFileToLesson

  }

  GoTOLessonData(): void {
    if (this.lessonId) {
      this._AppDataService.GetLessonById(this.lessonId.value).subscribe({
        next: (response) => {
          this.lessonData = response.data;
          this.showLessonData = true;
          console.log(this.lessonData)
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.showLessonData = false;
        }
      });
      this._AppDataService.GetLessonResources(this.lessonId.value).subscribe({
        next: (response) => {
          this.lessonFiles = response.data;
          this.showLessonData = true;
          console.log(this.lessonFiles)
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.showLessonData = false;
        }
      });
    }
  }

  onFileSelected(event: any): void {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        this.Files.push(this.fb.control(selectedFiles[i]));
      }
    }
  }


  AddFile(): void {
    if (this.Files.length > 0) {
      const lastFile = this.Files.at(this.Files.length - 1).value;
      const apiPayload = {
        Files: this.Files.value,
        LessonId: this.lessonId?.value
      };
      console.log(apiPayload);
      if (apiPayload != null) {
        this._AppDataService.UploadLessonResource(apiPayload).subscribe({
          next: (response) => {
            if (response.error == null) {
              window.console.warn('File Added Successfully!');
              this.addFileForm.reset()
              this.ShowAddFileToLesson = false;
            }
          },
          error: (err: HttpErrorResponse) => {
            console.log(err.error.message)
          }
        })
      }
    } else {
      console.log("No files have been added yet!");
    }
  }

  Submit(): void {
    console.log(this.addClassForm.value);
  }
}
