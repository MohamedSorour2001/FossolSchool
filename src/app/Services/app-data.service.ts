import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  back:string="https://localhost:5001/api/"
  constructor(private HttpClient:HttpClient) { }

  // --------------- Users API's ---------------

  GetAllStudents(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    console.log(headers);
    return this.HttpClient.post(this.back + 'User/get-all-students', {}, { headers });
  }
  GetStudentById(id:any):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.HttpClient.post(this.back+'User/get-by-id-student/'+id, {},{headers});
  }
  GetStudentsByTeacherId(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    console.log(headers);
    return this.HttpClient.post(this.back + 'User/get-students-by-id-teacher', {}, { headers });
  }
  AddStudent(data:object):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.HttpClient.post(this.back+'User/create-student',data,{headers});
  }
  AddTeacherDetails(data:object):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.HttpClient.post(this.back+'User/add-teacher-details',data,{headers});
  }

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

  EditAcademicTerm(id:any,data:object):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.HttpClient.post(this.back+'AcademicTerm/update/'+id,data,{headers});
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

  GetSubjectByGradelId(id:any):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.HttpClient.post(this.back+'Subject/get-by-grade/'+id, {},{headers});
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
  // --------------- Lesson API's ---------------
  GetAllLessons(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    console.log(headers);
    return this.HttpClient.post(this.back + 'Lesson/get-all-lessons', {}, { headers });
  }

  GetLessonById(id:any):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.HttpClient.post(this.back+'Lesson/get-lesson-by-id/'+id, {},{headers});
  }

  GetLessonBySubjectlId(id:any):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.HttpClient.post(this.back+'Lesson/get-lessons-by-subject/'+id, {},{headers});
  }
  GetLessonResources(id:any):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.HttpClient.post(this.back+'Lesson/lesson-get-resource/'+id, {},{headers});
  }

  AddLesson(data:object):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.HttpClient.post(this.back+'Lesson/create-lesson',data,{headers});
  }

  UpdateLesson(id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.HttpClient.post(this.back + 'Lesson/update-lesson/' + id, {}, { headers });
  }

  DeleteLesson(id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.HttpClient.post(this.back + 'Lesson/delete-lesson/' + id, {}, { headers });
  }

  UploadLessonResource(data:object):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.HttpClient.post(this.back+'Lesson/upload-resource',data,{headers});
  }

  // --------------- Class API's ---------------
  GetAllClasss(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    console.log(headers);
    return this.HttpClient.post(this.back + 'Class/get-all', {}, { headers });
  }

  GetClassById(id:any):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.HttpClient.post(this.back+'Class/get-by-id/'+id, {},{headers});
  }
  GetStudentsByClassId(id:any,classId:any):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.HttpClient.post(this.back+'Class/get-students-by-class-id/'+id+'?classid='+classId, {},{headers});
  }

  GetClassByGradelId(id:any):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.HttpClient.post(this.back+'Class/get-by-grade/'+id, {},{headers});
  }
  AddClass(data:object):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.HttpClient.post(this.back+'Class/create',data,{headers});
  }

  DeleteClass(id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.HttpClient.post(this.back + 'Class/delete/' + id, {}, { headers });
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
