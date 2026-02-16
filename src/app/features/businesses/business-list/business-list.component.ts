
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { ApiConfiguration as BusinessConfig } from '../../../services/business-services/api-configuration';
import { apiStoresGet } from '../../../services/business-services/fn/stores/api-stores-get';

interface Business {
    id: string;
    name: string;
    address?: string;
    // Add other fields
}

@Component({
    selector: 'app-business-list',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="card">
      <div class="card-header">
        <h3>Business Management</h3>
        <button class="btn btn-primary" routerLink="/admin/businesses/register">Register Business</button>
      </div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let biz of businesses">
              <td>{{ biz.id }}</td>
              <td>{{ biz.name }}</td>
              <td>{{ biz.address || '-' }}</td>
              <td>
                <button class="btn btn-sm btn-info">Details</button>
              </td>
            </tr>
            <tr *ngIf="businesses.length === 0">
              <td colspan="4" class="text-center">No businesses found.</td>
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
    .text-center { text-align: center; }
  `]
})
export class BusinessListComponent implements OnInit {
    businesses: Business[] = [];

    constructor(
        private http: HttpClient,
        private config: BusinessConfig
    ) { }

    ngOnInit() {
        this.loadBusinesses();
    }

    loadBusinesses() {
        apiStoresGet(this.http, this.config.rootUrl).subscribe({
            next: (res) => {
                try {
                    const body = res.body;
                    let data: any;
                    if (typeof body === 'string') {
                        data = JSON.parse(body);
                    } else {
                        data = body;
                    }

                    if (data && data.result && Array.isArray(data.result)) {
                        this.businesses = data.result;
                    } else if (Array.isArray(data)) {
                        this.businesses = data;
                    }
                } catch (e) {
                    console.error('Failed to parse API response', e);
                }
            },
            error: (err) => {
                console.error('Error fetching businesses', err);
            }
        });
    }
}

