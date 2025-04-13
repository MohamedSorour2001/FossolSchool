import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppDataService } from 'src/app/Services/app-data.service';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit {

    levels:any[]=[];
    ShowAddAcademinTerm:boolean=false;
    ShowEditAcademinTerm:boolean=false;
    addClassForm:FormGroup
          constructor(private db:FormBuilder ,private Router:Router ,private _AppDataService:AppDataService){
            this.addClassForm=db.group({
              name:['',[Validators.required]]
            })
          }

          get name(){
            return this.addClassForm.get("name")
          }

      Toggle(){
        this.ShowAddAcademinTerm=!this.ShowAddAcademinTerm
      }
      ToggleEdit(){
        this.ShowEditAcademinTerm=!this.ShowEditAcademinTerm
      }

      GetLevels(){
        this._AppDataService.GetAllLevels().subscribe({
          next:(response)=>{
            this.levels=response.data
            console.log(this.levels)
          },
          error:(err:HttpErrorResponse)=>{
            console.log(err)
          }
        })
      }

      ngOnInit(): void {
        this.GetLevels()
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
