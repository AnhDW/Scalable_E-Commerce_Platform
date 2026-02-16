
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration as AuthConfig } from '../../../services/auth-services/api-configuration';
import { apiRolesGet } from '../../../services/auth-services/fn/roles/api-roles-get';
import { apiAuthAssignRolePost } from '../../../services/auth-services/fn/auth/api-auth-assign-role-post';
import { apiUsersIdGet } from '../../../services/auth-services/fn/users/api-users-id-get';

interface Role {
    id: string;
    name: string;
    code: string;
}

@Component({
    selector: 'app-role-management',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="card">
      <div class="card-header">
        <h3>Manage Roles for: {{ userName }}</h3>
        <button class="btn btn-secondary" routerLink="/admin/users">Back to List</button>
      </div>
      <div class="card-body">
        <h4>Available Roles</h4>
        <div class="role-list">
          <div *ngFor="let role of roles" class="role-item">
            <span>{{ role.name }} ({{ role.code }})</span>
            <button class="btn btn-sm btn-primary" (click)="assignRole(role.name)">Assign</button>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .card { background: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); padding: 20px; }
    .card-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 20px; }
    .role-item { display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #f0f0f0; }
    .btn { padding: 5px 10px; cursor: pointer; border: none; border-radius: 4px; }
    .btn-primary { background: #007bff; color: whitespace; }
    .btn-secondary { background: #6c757d; color: white; }
  `]
})
export class RoleManagementComponent implements OnInit {
    userId: string | null = null;
    userName: string = '';
    userCode: string = '';
    roles: Role[] = [];

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private config: AuthConfig
    ) { }

    ngOnInit() {
        this.userId = this.route.snapshot.paramMap.get('id');
        if (this.userId) {
            this.loadUser(this.userId);
            this.loadRoles();
        }
    }

    loadUser(id: string) {
        apiUsersIdGet(this.http, this.config.rootUrl, { id: id }).subscribe({
            next: (res) => {
                try {
                    const body = res.body;
                    let data: any;
                    if (typeof body === 'string') data = JSON.parse(body);
                    else data = body;

                    if (data && data.result) {
                        this.userName = data.result.FullName;
                        this.userCode = data.result.UserCode;
                    }
                } catch (e) { }
            }
        });
    }

    loadRoles() {
        apiRolesGet(this.http, this.config.rootUrl).subscribe({
            next: (res) => {
                try {
                    const body = res.body;
                    let data: any;
                    if (typeof body === 'string') data = JSON.parse(body);
                    else data = body;

                    if (data && data.result) {
                        this.roles = data.result;
                    }
                } catch (e) { }
            }
        });
    }

    assignRole(roleName: string) {
        if (!this.userCode) {
            alert('User code not loaded');
            return;
        }

        apiAuthAssignRolePost(this.http, this.config.rootUrl, {
            body: { userName: this.userCode, roleName: roleName }
        }).subscribe({
            next: () => alert('Role assigned successfully!'),
            error: (err) => console.error('Failed to assign role', err)
        });
    }
}
