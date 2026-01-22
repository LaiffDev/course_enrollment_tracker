import { Component, inject, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';

import { MatSelectModule } from '@angular/material/select';
import { AuthenticationService } from '../../shared/services/authentication-service';

@Component({
  selector: 'app-register',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterLink,
    MatSelectModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  //form controls
  readonly fullname = new FormControl('', [Validators.required]);
  readonly username = new FormControl('', [Validators.required]);
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('', [Validators.required]);
  readonly role = new FormControl('', [Validators.required]);

  //dependecies
  private authenticationService = inject(AuthenticationService);
  private router = inject(Router);

  //signals
  hide = signal(true);

  //variables
  options: string[] = ['Studente', 'Docente'];

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  registerUser() {
    const fullname = this.fullname.value;
    const username = this.username.value;
    const email = this.email.value;
    const password = this.password.value;
    const role = this.role.value;

    if (!fullname || !username || !email || !password || !role) {
      alert('Compila tutti i campi!');
      return;
    }

    const payload = {
      fullname,
      username,
      email,
      password,
      role,
    };

    this.authenticationService.RegisterUser(payload).subscribe({
      next: (res) => {
        if (res) {
          alert('Registrazione avvenuta con successo.');
          this.router.navigate(['']);
        }
      },
      error: (err) => {
        console.error('Errore : ', err);
        alert('Errore durante la registrazione');
      },
    });
  }
}
