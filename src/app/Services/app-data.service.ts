import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  back:string=""
  constructor(private HttpClient:HttpClient) { }

  // --------------- Users API's ---------------
  // GetAllUsers(): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${localStorage.getItem('token')}`
  //   });
  //   console.log(headers);
  //   return this.HttpClient.post(this.back + 'Users/get-all-user', {}, { headers });
  // }

  // DeleteQuestion(id: any): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${localStorage.getItem('token')}`
  //   });
  //   return this.HttpClient.post(this.back + 'Question/delete?id=' + id, {}, { headers });
  // }

  // AddQuestion(data:object):Observable<any>{
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${localStorage.getItem('token')}`
  //   });
  //   return this.HttpClient.post(this.back+'Question/add',data,{headers});
  // }

  // GetQuestionById(id:any):Observable<any>{
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${localStorage.getItem('token')}`
  //   });
  //   return this.HttpClient.post(this.back+'Question/get-by-id?id='+id, {},{headers});
  // }

  // EditQuestion(data:object):Observable<any>{
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${localStorage.getItem('token')}`
  //   });
  //   return this.HttpClient.post(this.back+'Question/update',data,{headers});
  // }

  // GetSequenceQuestion(id:any):Observable<any>{
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${localStorage.getItem('token')}`
  //   });
  //   return this.HttpClient.post(this.back+'Sequence/questions/' + id, {},{headers});
  // }

  // SaveUserAnswers(SeqId:any,data:object):Observable<any>{
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${localStorage.getItem('token')}`
  //   });
  //   return this.HttpClient.post(this.back+'Request/save-user-answers?sequenceId='+SeqId,data,{headers});
  // }

}
