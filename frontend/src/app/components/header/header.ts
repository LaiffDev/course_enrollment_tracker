import { Component, inject, signal } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatMenuModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  //dependecies
  private router = inject(Router);

  //signals
  user: any;
  fullname: string | null = null;

  ngOnInit() {
    if (typeof localStorage !== undefined) {
      this.user = JSON.parse(localStorage.getItem('user') || 'null');
      this.fullname = this.user.fullname;
    }
  }

  logoutUser() {
    //remove everything from local storage and navigate to the login page
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
