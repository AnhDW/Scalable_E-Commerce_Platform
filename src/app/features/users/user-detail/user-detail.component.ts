
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration as AuthConfig } from '../../../services/auth-services/api-configuration';
import { apiUsersIdGet } from '../../../services/auth-services/fn/users/api-users-id-get';
import { apiUsersPut } from '../../../services/auth-services/fn/users/api-users-put';

@Component({
    selector: 'app-user-detail',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    template: `
    <div class="card">
      <div class="card-header">
        <h3>{{ isEditMode ? 'Edit User' : 'User Details' }}</h3>
        <button class="btn btn-secondary" routerLink="/admin/users">Back to List</button>
      </div>
      <div class="card-body">
        <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="fullName">Full Name</label>
            <input type="text" id="fullName" class="form-control" formControlName="FullName">
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" class="form-control" formControlName="Email">
          </div>
          <div class="form-group">
            <label for="phoneNumber">Phone Number</label>
            <input type="text" id="phoneNumber" class="form-control" formControlName="PhoneNumber">
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn btn-primary" [disabled]="userForm.invalid || isSubmitting">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  `,
    styles: [`
    .card {
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      overflow: hidden;
      max-width: 800px;
      margin: 0 auto;
    }
    .card-header {
      padding: 15px 20px;
      background: #f8f9fa;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .card-body { padding: 20px; }
    .form-group { margin-bottom: 15px; }
    .form-group label { display: block; margin-bottom: 5px; font-weight: 600; }
    .form-control {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
    }
    .form-actions { margin-top: 20px; text-align: right; }
    .btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.875rem;
    }
    .btn-primary { background-color: #3498db; color: #fff; }
    .btn-secondary { background-color: #95a5a6; color: #fff; }
    .btn:disabled { opacity: 0.7; cursor: not-allowed; }
  `]
})
export class UserDetailComponent implements OnInit {
    userForm: FormGroup;
    userId: string | null = null;
    isEditMode = false;
    isSubmitting = false;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        private config: AuthConfig
    ) {
        this.userForm = this.fb.group({
            FullName: ['', Validators.required],
            Email: ['', [Validators.required, Validators.email]],
            PhoneNumber: ['']
        });
    }

    ngOnInit() {
        this.userId = this.route.snapshot.paramMap.get('id');
        if (this.userId) {
            this.isEditMode = true;
            this.loadUser(this.userId);
        }
    }

    loadUser(id: string) {
        apiUsersIdGet(this.http, this.config.rootUrl, { id: id }).subscribe({
            next: (res) => {
                try {
                    const body = res.body;
                    let data: any;
                    if (typeof body === 'string') {
                        data = JSON.parse(body);
                    } else {
                        data = body;
                    }

                    if (data && data.result) {
                        this.userForm.patchValue(data.result);
                    }
                } catch (e) {
                    console.error('Failed to parse user data', e);
                }
            },
            error: (err) => console.error('Error loading user', err)
        });
    }

    onSubmit() {
        if (this.userForm.invalid) return;

        this.isSubmitting = true;
        const formValue = this.userForm.value;

        // Construct the payload as per apiUsersPut params
        // Note: apiUsersPut expects a body object with keys
        const payload = {
            Id: this.userId!,
            ...formValue
            // If handling file upload, it would be different
        };

        apiUsersPut(this.http, this.config.rootUrl, { body: payload }).subscribe({
            next: () => {
                alert('User updated successfully');
                this.isSubmitting = false;
                this.router.navigate(['/admin/users']);
            },
            error: (err) => {
                console.error('Error updating user', err);
                this.isSubmitting = false;
                alert('Failed to update user');
            }
        });
    }
}
