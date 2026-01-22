import { Component, inject, signal } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { UserModel } from '../../shared/models/user-model';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatMenuModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  //dependecies
  private router = inject(Router);

  //signals
  user: any;
  username: string | null = null;

  ngOnInit() {
    if (typeof localStorage !== undefined) {
      this.user = JSON.parse(localStorage.getItem('user') || 'null');
      this.username = this.user.username;
    }
  }

  logoutUser() {
    //remove everything from local storage and navigate to the login page
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
