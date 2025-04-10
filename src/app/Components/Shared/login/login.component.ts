import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/Services/user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    error:string="";
    isLoading:boolean=false;
    loginForm:FormGroup
  constructor(private db:FormBuilder ,private Router:Router ,private _UserDataService:UserDataService){
    this.loginForm=db.group({
      phone:['',[Validators.required]],
      password:['',[Validators.required]],
    })
  }
  get phone(){
    return this.loginForm.get("phone")
  }
  get password(){
    return this.loginForm.get("password")
  }


  Submit(){
  //   if(this.loginForm.valid){
  //     this.isLoading=true;
  //     this._UserDataService.login(this.loginForm.value).subscribe({
  //       next:(response)=>{
  //         if(response!=null){
  //           localStorage.setItem('token',response.data.token)
  //           this._UserDataService.saveUserData()
  //           if(this._UserDataService.role=='Admin'){
  //             this.isLoading=false;
  //             this.Router.navigate(['/home'])
  //             this.error=""
  //           }else if(this._UserDataService.role=='Teacher'){
  //             this.isLoading=false;
  //             this.Router.navigate(['/TeacherHome'])
  //             this.error=""
  //           }else if(this._UserDataService.role=='Student'){
  //             this.isLoading=false;
  //             this.Router.navigate(['/StudentHome'])
  //             this.error=""
  //           }
  //         }
  //       },
  //       error:(err:HttpErrorResponse)=>{
  //         this.isLoading=false;
  //         console.log(err.error.message)
  //         this.error="من فضلك أدخل بيانات صالحة"
  //       }
  //     })
  //   }
  }


  }


