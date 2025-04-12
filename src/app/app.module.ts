import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/Admin/home/home.component';
import { NavbarComponent } from './Components/Shared/navbar/navbar.component';
import { LoginComponent } from './Components/Shared/login/login.component';
import { RegisterComponent } from './Components/Shared/register/register.component';
import { NotFoundComponent } from './Components/Shared/not-found/not-found.component';
import { AdminComponent } from './Components/Admin/admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './Components/Admin/header/header.component';
import { ChooseLessonComponent } from './Components/Teacher/choose-lesson/choose-lesson.component';
import { TeacherComponent } from './Components/Teacher/teacher/teacher.component';
import { AddTeacherComponent } from './Components/Admin/add-teacher/add-teacher.component';
import { PackageForTeacherComponent } from './Components/Admin/package-for-teacher/package-for-teacher.component';
import { ClassesComponent } from './Components/Teacher/classes/classes.component';
import { ClassStudentComponent } from './Components/Teacher/class-student/class-student.component';
import { AcademicTermComponent } from './Components/Admin/academic-term/academic-term.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    AdminComponent,
    HeaderComponent,
    ChooseLessonComponent,
    TeacherComponent,
    AddTeacherComponent,
    PackageForTeacherComponent,
    ClassesComponent,
    ClassStudentComponent,
    AcademicTermComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
