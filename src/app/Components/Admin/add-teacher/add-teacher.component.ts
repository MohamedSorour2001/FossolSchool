import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/Services/user-data.service';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent {

  isLoading:boolean=false;
    registerForm:FormGroup
    constructor(private db:FormBuilder ,private Router:Router ,private _UserDataService:UserDataService){
      this.registerForm=db.group({
        userName:['',[Validators.required]],
        userEmail:['',[Validators.required]],
        phoneNumber:['',[Validators.required]],
        password:['',[Validators.required]],
      })
    }

    get userName(){
      return this.registerForm.get("userName")
    }
    get userEmail(){
      return this.registerForm.get("userEmail")
    }
    get phoneNumber(){
      return this.registerForm.get("phoneNumber")
    }
    get password(){
      return this.registerForm.get("password")
    }


    Submit(){
      console.log(this.registerForm.value)
      if(this.registerForm.valid){
        this._UserDataService.AddTeacher(this.registerForm.value).subscribe({
          next:(response)=>{
            console.log(response)
            const id=response.data;
            if(response.error==null){
              console.log('Teacher Added Successfuly')
              this.Router.navigate(['addPackageForTeacher',id])
            }
          },
          error:(err:HttpErrorResponse)=>{
            console.log(err.error.message)
          }
        })
      }
    }
}
