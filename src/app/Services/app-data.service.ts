import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  back:string="https://localhost:5001/api/"
  constructor(private HttpClient:HttpClient) { }

  // --------------- AcademicTerm API's ---------------
  GetAllAcademicTerms(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    console.log(headers);
    return this.HttpClient.post(this.back + 'AcademicTerm/get-all', {}, { headers });
  }

  DeleteAcademicTerm(id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.HttpClient.post(this.back + 'AcademicTerm/delete/' + id, {}, { headers });
  }

  AddAcademicTerm(data:object):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.HttpClient.post(this.back+'AcademicTerm/create',data,{headers});
  }

  GetAcademicTermById(id:any):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.HttpClient.post(this.back+'AcademicTerm/get-by-id/'+id, {},{headers});
  }



  // --------------- Level API's ---------------
  GetAllLevels(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    console.log(headers);
    return this.HttpClient.post(this.back + 'Level/get-all', {}, { headers });
  }

  GetLevelById(id:any):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.HttpClient.post(this.back+'Level/get-by-id/'+id, {},{headers});
  }

  DeleteLevel(id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.HttpClient.post(this.back + 'Level/delete/' + id, {}, { headers });
  }

  AddLevel(data:object):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.HttpClient.post(this.back+'Level/create',data,{headers});
  }
  // --------------- Grade API's ---------------
  GetAllGrades(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    console.log(headers);
    return this.HttpClient.post(this.back + 'Grade/get-all', {}, { headers });
  }

  GetGradeById(id:any):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.HttpClient.post(this.back+'Grade/get-by-id/'+id, {},{headers});
  }
  GetGradeByLevelId(id:any):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.HttpClient.post(this.back+'Grade/get-by-level/'+id, {},{headers});
  }

  AddGrade(data:object):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.HttpClient.post(this.back+'Grade/create',data,{headers});
  }

  DeleteGrade(id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.HttpClient.post(this.back + 'Grade/delete/' + id, {}, { headers });
  }
  // --------------- Subject API's ---------------
  GetAllSubjects(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    console.log(headers);
    return this.HttpClient.post(this.back + 'Subject/get-all', {}, { headers });
  }

  GetSubjectById(id:any):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.HttpClient.post(this.back+'Subject/get-by-id/'+id, {},{headers});
  }

  AddSubject(data:object):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.HttpClient.post(this.back+'Subject/create',data,{headers});
  }

  DeleteSubject(id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.HttpClient.post(this.back + 'Subject/delete/' + id, {}, { headers });
  }


  // EditLevel(data:object):Observable<any>{
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${localStorage.getItem('token')}`
  //   });
  //   return this.HttpClient.post(this.back+'Question/update',data,{headers});
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
