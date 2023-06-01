import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/@shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  isLogging: boolean = false;
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.formLogin.valid) {
      this.isLogging = true;
      this.authService
        .SignIn(this.formLogin.value.username, this.formLogin.value.password)
        .then(() => {
          this.isLogging = false;
        })
        .catch(() => {
          this.isLogging = false;
        });
    }
  }
}
