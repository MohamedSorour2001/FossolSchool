import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/Services/user-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menuOpen = false;
  isSettingBarOpen = false;
  role: any = "";

  constructor(private _UserDataService: UserDataService) {
    this.role = localStorage.getItem("role");
  }


  toggleSetting(event: Event) {
    this.isSettingBarOpen = !this.isSettingBarOpen;
    const target = event.currentTarget as HTMLElement;
    const icon = target.querySelector('i');
    console.log(icon);
    if (icon) {
      icon.classList.toggle('active');
    }
    const menuButton = document.querySelector('.nav_home>i');
    if (menuButton) {
      menuButton.classList.remove('active');
      this.menuOpen = false;
    }
  }

  toggleMenu(event: Event) {
    this.menuOpen = !this.menuOpen;
    const target = event.currentTarget as HTMLElement;
    const icon = target.querySelector('i');
    console.log(icon);
    if (icon) {
      icon.classList.toggle('active');
    }
    const settingButton = document.querySelector('.nav_setting>i');
    if (settingButton) {
      settingButton.classList.remove('active');
      this.isSettingBarOpen = false;
    }
  }
  logOut() {
    this._UserDataService.logOut()
  }
  ngOnInit(): void {
    this.role = localStorage.getItem("role");
  }
}
