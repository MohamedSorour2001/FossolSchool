import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppDataService } from 'src/app/Services/app-data.service';

@Component({
  selector: 'app-academic-term',
  templateUrl: './academic-term.component.html',
  styleUrls: ['./academic-term.component.css']
})
export class AcademicTermComponent {
  students = [
    { number: 1, name: 'اسامة محمد', interactionRate: 'مشاغب', grades: 1, date: '2024-11-02', supervisor: 'admin' },
    { number: 2, name: 'علي احمد', interactionRate: 'سراح', grades: 2, date: '2024-11-02', supervisor: 'admin' },
    { number: 3, name: 'ادم حسام', interactionRate: 'عدم احضار الكتاب', grades: 3, date: '2024-11-02', supervisor: 'admin' },
    { number: 4, name: 'اشرف علي', interactionRate: 'عدم احضار الادوات', grades: 4, date: '2024-11-02', supervisor: 'admin' }
  ];


  ShowAddAcademinTerm:boolean=false;
  ShowEditAcademinTerm:boolean=false;
  addClassForm:FormGroup
        constructor(private db:FormBuilder ,private Router:Router ,private _AppDataService:AppDataService){
          this.addClassForm=db.group({
            name:['',[Validators.required]],
            startDate:['',[Validators.required]],
            endDate:['',[Validators.required]]
          })
        }

        get name(){
          return this.addClassForm.get("name")
        }
        get startDate(){
          return this.addClassForm.get("startDate")
        }
        get endDate(){
          return this.addClassForm.get("endDate")
        }

    Toggle(){
      this.ShowAddAcademinTerm=!this.ShowAddAcademinTerm
    }
    ToggleEdit(){
      this.ShowEditAcademinTerm=!this.ShowEditAcademinTerm
    }

    Submit(){
      console.log(this.addClassForm.value)
      if(this.addClassForm.valid){
        this._AppDataService.AddLevel(this.addClassForm.value).subscribe({
          next:(response)=>{
            console.log(response)
            if(response.error==null){
              console.log('Level Added Successfuly')
            }
          },
          error:(err:HttpErrorResponse)=>{
            console.log(err.error.message)
          }
        })
      }
    }



}
