import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDataService } from 'src/app/Services/app-data.service';

@Component({
  selector: 'app-class-student',
  templateUrl: './class-student.component.html',
  styleUrls: ['./class-student.component.css']
})
export class ClassStudentComponent {
  ClassId: string;
  class: any;
  TeacherId: string;
  addStudent: boolean = false;

  addClassForm: FormGroup
  constructor(private db: FormBuilder, private route: ActivatedRoute, private Router: Router, private _AppDataService: AppDataService) {
    this.ClassId = this.route.snapshot.params['id'];
    this.TeacherId = '09eda6b4-33c7-4b00-9792-87a26ea64321'
    this.addClassForm = db.group({
      userName: [[], [Validators.required]],
      userEmail: [[], [Validators.required]],
      password: [[], [Validators.required]],
      teacherId: [this.TeacherId, [Validators.required]],
      classId: [this.ClassId, [Validators.required]]
    });
  }

  get userName() {
    return this.addClassForm.get('teacherId');
  }
  get userEmail() {
    return this.addClassForm.get('userEmail');
  }
  get password() {
    return this.addClassForm.get('password');
  }
  get teacherId() {
    return this.addClassForm.get('teacherId');
  }
  get classId() {
    return this.addClassForm.get('classId');
  }

  Toggle() {
    this.addStudent = !this.addStudent
  }

  GetClass() {
    this._AppDataService.GetClassById(this.ClassId).subscribe({
      next: (response) => {
        this.class = response.data
        console.log(this.class)
      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
      }
    })
  }

  ngOnInit(): void {
    this.GetClass()
  }

  Submit() {
    console.log(this.addClassForm.value)
    if (this.addClassForm.valid) {
      this._AppDataService.AddStudent(this.addClassForm.value).subscribe({
        next: (response) => {
          if (response.error == null) {
            console.log('Student Added Successfuly')
            this.GetClass()
            this.addClassForm.reset();
            this.addStudent=false;
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
