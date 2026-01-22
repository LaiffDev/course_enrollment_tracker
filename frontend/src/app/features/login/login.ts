import { Component, inject, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { Router, RouterLink } from '@angular/router';
import { UserModel } from '../../shared/models/user-model';
import { AuthenticationService } from '../../shared/services/authentication-service';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  //form controls
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('', [Validators.required]);

  private authenticationService = inject(AuthenticationService);
  private router = inject(Router);

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  loginUser() {
    const email = this.email.value;
    const password = this.password.value;

    if (!email || !password) {
      alert('Credenziali non valide. Verifica email e password e riprova.');
      return;
    }

    this.authenticationService.LoginUser(email, password).subscribe({
      next: () => this.router.navigate(['/homepage']),
      error: (err) => {
        console.error('Login error:', err);
        alert('Credenziali non valide. Verifica email e password e riprova.');
      },
    });
  }
}
