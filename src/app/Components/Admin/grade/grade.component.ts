import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppDataService } from 'src/app/Services/app-data.service';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent {
      levels:any[]=[];
      grades:any[]=[];
      ShowAddAcademinTerm:boolean=false;
      ShowEditAcademinTerm:boolean=false;
      addClassForm:FormGroup
            constructor(private db:FormBuilder ,private Router:Router ,private _AppDataService:AppDataService){
              this.addClassForm=db.group({
                name:['',[Validators.required]],
                levelId:['',[Validators.required]]
              })
            }

            get name(){
              return this.addClassForm.get("name")
            }
            get levelId(){
              return this.addClassForm.get("levelId")
            }

        Toggle(){
          this.ShowAddAcademinTerm=!this.ShowAddAcademinTerm
        }
        ToggleEdit(){
          this.ShowEditAcademinTerm=!this.ShowEditAcademinTerm
        }

        GetGrades(){
          this._AppDataService.GetAllGrades().subscribe({
            next:(response)=>{
              this.grades=response.data
              console.log(this.grades)
            },
            error:(err:HttpErrorResponse)=>{
              console.log(err)
            }
          })
        }
        GetLevels(){
          this._AppDataService.GetAllLevels().subscribe({
            next:(response)=>{
              this.levels=response.data
            },
            error:(err:HttpErrorResponse)=>{
              console.log(err)
            }
          })
        }

        deleteGrade(id:any){
          this._AppDataService.DeleteGrade(id).subscribe({
            next:(response)=>{
              window.console.warn('Grade Deleted Successfully!');
              this.GetGrades()
            },error:(err:HttpErrorResponse)=>{
              console.log(err)
            }
          })
        }


        ngOnInit(): void {
          this.GetGrades()
          this. GetLevels()
        }


        Submit(){
          console.log(this.addClassForm.value)
          if(this.addClassForm.valid){
            this._AppDataService.AddGrade(this.addClassForm.value).subscribe({
              next:(response)=>{
                console.log(response)
                if(response.error==null){
                  window.console.warn('Grade Added Successfully!');
                  this.ShowAddAcademinTerm=false;
                  this.GetGrades()
                  this.addClassForm.reset()
                }
              },
              error:(err:HttpErrorResponse)=>{
                console.log(err.error.message)
              }
            })
          }
        }

}
