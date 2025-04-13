import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppDataService } from 'src/app/Services/app-data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-academic-term',
  templateUrl: './academic-term.component.html',
  styleUrls: ['./academic-term.component.css']
})
export class AcademicTermComponent {
  AcademicTerms: any[] = [];
  ShowAddAcademinTerm: boolean = false;
  ShowEditAcademinTerm: boolean = false;
  addClassForm: FormGroup
  constructor(private db: FormBuilder, private Router: Router, private _AppDataService: AppDataService, private datePipe: DatePipe) {
    this.addClassForm = db.group({
      name: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]]
    })
  }

  get name() {
    return this.addClassForm.get("name")
  }
  get startDate() {
    return this.addClassForm.get("startDate")
  }
  get endDate() {
    return this.addClassForm.get("endDate")
  }

  Toggle() {
    this.ShowAddAcademinTerm = !this.ShowAddAcademinTerm
  }
  ToggleEdit() {
    this.ShowEditAcademinTerm = !this.ShowEditAcademinTerm
  }

  GetAcademicTerms() {
    this._AppDataService.GetAllAcademicTerms().subscribe({
      next: (response) => {
        this.AcademicTerms = response.data
        console.log(this.AcademicTerms)
      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
      }
    })
  }

  ngOnInit(): void {
    this.GetAcademicTerms()
  }

  Submit() {
    const formattedStartDate = this.datePipe.transform(this.addClassForm.get('startDate')?.value, 'dd/MM/yyyy');
    const formattedEndDate = this.datePipe.transform(this.addClassForm.get('endDate')?.value, 'dd/MM/yyyy');
    const requestData = {
      ...this.addClassForm.value,
      startDate: formattedStartDate,
      endDate: formattedEndDate
    };
    console.log(requestData)
    if (this.addClassForm.valid) {
      this._AppDataService.AddAcademicTerm(requestData).subscribe({
        next: (response) => {
          console.log(response)
          if (response.error == null) {
            console.log('AcademinTerm Added Successfuly')
            this.GetAcademicTerms()
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error.message)
        }
      })
    }
  }

}
