import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-business-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './business-dashboard.component.html',
    styleUrl: './business-dashboard.component.css'
})
export class BusinessDashboardComponent {
    businessId: string | null = null;

    constructor(private route: ActivatedRoute) {
        this.route.paramMap.subscribe(params => {
            this.businessId = params.get('id');
        });
    }
}
