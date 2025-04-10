import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageForTeacherComponent } from './package-for-teacher.component';

describe('PackageForTeacherComponent', () => {
  let component: PackageForTeacherComponent;
  let fixture: ComponentFixture<PackageForTeacherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PackageForTeacherComponent]
    });
    fixture = TestBed.createComponent(PackageForTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
