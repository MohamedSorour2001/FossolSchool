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
        name:['',[Validators.required]],
        phone:['',[Validators.required]],
        password:['',[Validators.required]],
        confirmPassword:['',[Validators.required]]
      })
    }

    get name(){
      return this.registerForm.get("name")
    }
    get phone(){
      return this.registerForm.get("phone")
    }
    get password(){
      return this.registerForm.get("password")
    }
    get confirmPassword(){
      return this.registerForm.get("confirmPassword")
    }


    Submit(){
      // this.isLoading=true;
      // console.log(this.registerForm.value)
      // if(this.registerForm.valid){
      //   this._UserDataService.register(this.registerForm.value).subscribe({
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
