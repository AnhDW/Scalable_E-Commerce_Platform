import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink, ButtonComponent],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    registerForm: FormGroup;
    isLoading = false;

    constructor(private fb: FormBuilder) {
        this.registerForm = this.fb.group({
            fullName: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]]
        }, { validators: this.passwordMatchValidator });
    }

    passwordMatchValidator(g: FormGroup) {
        return g.get('password')?.value === g.get('confirmPassword')?.value
            ? null : { mismatch: true };
    }

    onSubmit() {
        if (this.registerForm.valid) {
            this.isLoading = true;
            console.log('Register form submitted:', this.registerForm.value);
            // Simulate API call
            setTimeout(() => {
                this.isLoading = false;
                // Navigate to login or dashboard
            }, 1500);
        } else {
            this.registerForm.markAllAsTouched();
        }
    }
}
