import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';


@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink, ButtonComponent],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginForm: FormGroup;
    isLoading = false;

    constructor(private fb: FormBuilder) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            rememberMe: [false]
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.isLoading = true;
            console.log('Login form submitted:', this.loginForm.value);
            // Simulate API call
            setTimeout(() => {
                this.isLoading = false;
                // Navigate to dashboard or handle successful login
            }, 1500);
        } else {
            this.loginForm.markAllAsTouched();
        }
    }
}
