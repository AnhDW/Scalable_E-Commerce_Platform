
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration as BusinessConfig } from '../../../services/business-services/api-configuration';
import { apiStoresPost } from '../../../services/business-services/fn/stores/api-stores-post';
import { StoreDto } from '../../../services/business-services/models/store-dto';

@Component({
    selector: 'app-business-registration',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    template: `
    <div class="card">
      <div class="card-header">
        <h3>Register New Business</h3>
        <button class="btn btn-secondary" routerLink="/admin/businesses">Back to List</button>
      </div>
      <div class="card-body">
        <form [formGroup]="businessForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="name">Business Name</label>
            <input type="text" id="name" class="form-control" formControlName="name">
            <div *ngIf="businessForm.get('name')?.invalid && businessForm.get('name')?.touched" class="text-danger">
              Name is required.
            </div>
          </div>
          
          <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" class="form-control" formControlName="description"></textarea>
          </div>
          
          <div class="form-group">
            <label for="address">Address</label>
            <input type="text" id="address" class="form-control" formControlName="address">
          </div>
          
           <div class="form-group">
            <label for="currency">Currency</label>
            <input type="text" id="currency" class="form-control" formControlName="currency" placeholder="USD, VND, etc.">
          </div>
          
           <div class="form-group">
            <label for="language">Language</label>
            <input type="text" id="language" class="form-control" formControlName="language" placeholder="en, vi, etc.">
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn btn-primary" [disabled]="businessForm.invalid || isSubmitting">Register Business</button>
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
    textarea.form-control { min-height: 100px; resize: vertical; }
    .form-actions { margin-top: 20px; text-align: right; }
    .btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.875rem;
    }
    .btn-primary { background-color: #27ae60; color: #fff; }
    .btn-secondary { background-color: #95a5a6; color: #fff; }
    .btn:disabled { opacity: 0.7; cursor: not-allowed; }
    .text-danger { color: #e74c3c; font-size: 0.875rem; margin-top: 5px; }
  `]
})
export class BusinessRegistrationComponent {
    businessForm: FormGroup;
    isSubmitting = false;

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private config: BusinessConfig,
        private router: Router
    ) {
        this.businessForm = this.fb.group({
            name: ['', Validators.required],
            description: [''],
            address: [''],
            currency: ['VND'],
            language: ['vi']
        });
    }

    onSubmit() {
        if (this.businessForm.invalid) return;

        this.isSubmitting = true;
        const storeDto: StoreDto = this.businessForm.value;

        apiStoresPost(this.http, this.config.rootUrl, { body: storeDto }).subscribe({
            next: () => {
                alert('Business registered successfully');
                this.isSubmitting = false;
                this.router.navigate(['/admin/businesses']);
            },
            error: (err) => {
                console.error('Error registering business', err);
                this.isSubmitting = false;
                alert('Failed to register business');
            }
        });
    }
}
