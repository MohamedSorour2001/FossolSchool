import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/Admin/home/home.component';
import { NotFoundComponent } from './Components/Shared/not-found/not-found.component';
import { LoginComponent } from './Components/Shared/login/login.component';
import { RegisterComponent } from './Components/Shared/register/register.component';
import { AdminComponent } from './Components/Admin/admin/admin.component';
import { TeacherComponent } from './Components/Teacher/teacher/teacher.component';
import { ChooseLessonComponent } from './Components/Teacher/choose-lesson/choose-lesson.component';
import { AddTeacherComponent } from './Components/Admin/add-teacher/add-teacher.component';
import { PackageForTeacherComponent } from './Components/Admin/package-for-teacher/package-for-teacher.component';
import { ClassesComponent } from './Components/Teacher/classes/classes.component';
import { ClassStudentComponent } from './Components/Teacher/class-student/class-student.component';
import { AcademicTermComponent } from './Components/Admin/academic-term/academic-term.component';
import { LevelComponent } from './Components/Admin/level/level.component';
import { GradeComponent } from './Components/Admin/grade/grade.component';
import { SubjectComponent } from './Components/Admin/subject/subject.component';

const routes: Routes = [

  {path:"",component:AdminComponent,children:[
    {path:"",redirectTo:"addTeacher",pathMatch:'full'},
    {path:"addTeacher",component:AddTeacherComponent,title:''},
    {path:"addPackageForTeacher/:id",component:PackageForTeacherComponent,title:''},
    // {path:"addPackageForTeacher",component:PackageForTeacherComponent,title:''},
    {path:"academicTerm",component:AcademicTermComponent,title:''},
    {path:"level",component:LevelComponent,title:''},
    {path:"grade",component:GradeComponent,title:''},
    {path:"subject",component:SubjectComponent,title:''},
    {path:"home",component:HomeComponent,title:''},
  ]},
  {path:"",component:TeacherComponent,children:[
    {path:"",redirectTo:"classes",pathMatch:'full'},
    {path:"classes",component:ClassesComponent,title:'الفصول'},
    {path:"chooseLesson",component:ChooseLessonComponent,title:'إختيار درس'},
    {path:"classStudent",component:ClassStudentComponent,title:'الفصول'},
    // {path:"classStudent/:id",component:ClassStudentComponent,title:'الفصول'},
  ]},
  {path:"login",component:LoginComponent,title:'تسجيل دخول'},
  {path:"register",component:RegisterComponent,title:'إنشاء حساب'},
  {path:"**",component:NotFoundComponent,title:'خطأ'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// {path:"",canActivate:[adminAuthGuard],component:AdminComponent,children:[
//   {path:"",redirectTo:"home",pathMatch:'full'},
//   {path:"home",component:HomeComponent,title:'الرئيسية'},
//   {path:"home/matchedRequests/:id",component:MatchedRequestsComponent,title:'الطلبات المتشابهه'},
//   {path:"home/RequestInfio/:id",component:RequestInfoComponent,title:'بيانات الطلب'},
//   {path:"question",component:QuestionComponent,title:'الأسئلة'},
//   {path:"question/addQuestion",component:AddQuestionComponent,title:'إضافة سؤال'},
//   {path:"question/editQuestion/:id",component:EditQuestionComponent,title:'تعديل سؤال'},
//   {path:"sequence",component:SequenceComponent,title:'التسلسل'},
//   {path:"sequence/addSequence",component:AddSequenceComponent,title:'إضافة تسلسل'},
//   {path:"sequence/editSequence/:id",component:EditSequenceComponent,title:'تعديل تسلسل'},
//   {path:"sequence/addSequence/answerRelation/:id",component:AnswerRelationComponent,title:'علاقات الأسئلة'},
//   {path:"sequence/editSequence/answerRelation/:id",component:EditAnswerRelationComponent,title:'تعديل علاقات الأسئلة'},
//   {path:"user",component:UserComponent,title:'المستخدمين'},
//   {path:"user/addUser",component:AddUserComponent,title:'إضافه مستخدم'},
// ]},
// {path:"",canActivate:[userAuthGuard],component:UserLayoutComponent,children:[
//   {path:"",redirectTo:"UserHome",pathMatch:'full'},
//   {path:"UserHome",component:UserHomeComponent,title:'الرئيسية'},
//   {path:"request",component:RequestComponent,title:'طلباتى'},
//   {path:"request/matchedRequests/:id",component:MatchedRequestsComponent,title:'الطلبات المتشابهه'},
//   {path:"request/RequestInfio/:id",component:RequestInfoComponent,title:'بيانات الطلب'},
//   {path:"UserHome/addRequest/:id",component:AddRequestComponent,title:'إنشاء طلب'}
// ]},
// {path:'',component:AuthLayoutComponent,children:[
//   {path:"",redirectTo:"login",pathMatch:'full'},
//   {path:"login",component:LoginComponent,title:'تسجيل الدخول'},
//   {path:"register",component:RegisterComponent,title:'إنشاء حساب'},
// ]},
// {path:"**",component:NotFoundComponentComponent,title:'غير موجود'}
