import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppDataService } from 'src/app/Services/app-data.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent {
  addClass:boolean=false;

  addClassForm:FormGroup
      constructor(private db:FormBuilder ,private Router:Router ,private _AppDataService:AppDataService){
        this.addClassForm=db.group({
          name:['',[Validators.required]],
        })
      }

      get name(){
        return this.addClassForm.get("name")
      }

  Toggle(){
    this.addClass=!this.addClass
  }
  GoToEditQuestion(){
    this.Router.navigate(['Class/students',])
  }
  Submit(){
    // this.isLoading=true;
    // console.log(this.addClassForm.value)
    // if(this.addClassForm.valid){
    //   this._UserDataService.register(this.addClassForm.value).subscribe({
    //     next:(response)=>{
    //       this.isLoading=false;
    //       console.log(response)
    //       if(response.error==null){
    //         this.Router.navigate(['/login'])
    //       }
    //     },
    //     error:(err:HttpErrorResponse)=>{
    //       this.isLoading=false;
    //       console.log(err.error.message)
    //     }
    //   })
    // }
  }

}
