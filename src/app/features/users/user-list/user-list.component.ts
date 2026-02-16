
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { ApiConfiguration as AuthConfig } from '../../../services/auth-services/api-configuration';
import { apiUsersGet } from '../../../services/auth-services/fn/users/api-users-get';

interface User {
  id: string;
  code: string; // Assuming based on API params
  fullName: string;
  email?: string;
  phoneNumber?: string;
  // Add other fields as observed from API response
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="card">
      <div class="card-header">
        <h3>User Management</h3>
        <button class="btn btn-primary">Add User</button>
      </div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th>User Code</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of users">
              <td>{{ user.code }}</td>
              <td>{{ user.fullName }}</td>
              <td>{{ user.email || '-' }}</td>
              <td>
                <a [routerLink]="['/admin/users', user.id]" class="btn btn-sm btn-info">Edit</a>
                <a [routerLink]="['/admin/users', user.id, 'roles']" class="btn btn-sm btn-warning">Roles</a>
              </td>
            </tr>
            <tr *ngIf="users.length === 0">
              <td colspan="4" class="text-center">No users found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .card {
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .card-header {
      padding: 15px 20px;
      background: #f8f9fa;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .card-header h3 {
      margin: 0;
      font-size: 1.25rem;
    }
    .card-body {
      padding: 20px;
    }
    .table {
      width: 100%;
      border-collapse: collapse;
    }
    .table th, .table td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid #eee;
    }
    .table th {
      background-color: #f8f9fa;
      font-weight: 600;
      color: #333;
    }
    .btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.875rem;
      transition: background 0.2s;
    }
    .btn-primary { background-color: #3498db; color: #fff; }
    .btn-primary:hover { background-color: #2980b9; }
    .btn-sm { padding: 4px 8px; font-size: 0.75rem; margin-right: 5px; }
    .btn-info { background-color: #17a2b8; color: #fff; }
    .btn-warning { background-color: #ffc107; color: #000; }
    .text-center { text-align: center; }
  `]
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(
    private http: HttpClient,
    private config: AuthConfig
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    apiUsersGet(this.http, this.config.rootUrl).subscribe({
      next: (res) => {
        // Parse the response body as JSON since generated code treats it as text/void
        try {
          // The generated code returns StrictHttpResponse<void>, but the body is actually the response
          // We need to check if 'body' exists and is a string or object
          const body = res.body;
          let data: any;
          if (typeof body === 'string') {
            data = JSON.parse(body);
          } else {
            data = body;
          }

          if (data && data.result && Array.isArray(data.result)) {
            this.users = data.result;
          } else if (Array.isArray(data)) {
            this.users = data;
          } else {
            console.warn('Unexpected API response format:', data);
          }
        } catch (e) {
          console.error('Failed to parse API response', e);
        }
      },
      error: (err) => {
        console.error('Error fetching users', err);
      }
    });
  }
}
