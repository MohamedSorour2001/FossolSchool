import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  userData:any;
  role:any="";
  name:string="";
  id:string="";
  constructor(private HttpClient:HttpClient,private Router:Router) {}

  saveUserData(){
    if(localStorage.getItem('token') !=null){
      let encodeToken:any = localStorage.getItem('token');
      let decodeToken = jwtDecode(encodeToken);
      this.userData=decodeToken;
      const roleClaim = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
      this.role=this.userData[roleClaim];
      this.name=this.userData.email;
      localStorage.setItem("role",this.role)
    }
  }

  register(data:object):Observable<any>{
    return this.HttpClient.post('https://localhost:5001/api/Auth/register',data);
  }

  AddTeacher(data:object):Observable<any>{
    const headers = new HttpHeaders({
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
    return this.HttpClient.post('https://localhost:5001/api/User/create-teacher-basic',data,{headers});
  }

  login(data:object):Observable<any>{
    return this.HttpClient.post('https://localhost:5001/api/Auth/login',data);
  }

  logOut(){
    this.role='';
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    this.Router.navigate(['login'])
  }

  isTeacher(): boolean {
    return this.role === 'Teacher';
  }
  isStudent(): boolean {
    return this.role === 'Student';
  }
  isAdmin(): boolean {
    return this.role === 'Admin';
  }

  getRoleFromStorage(): void {
    this.role = localStorage.getItem('role');
  }

}




