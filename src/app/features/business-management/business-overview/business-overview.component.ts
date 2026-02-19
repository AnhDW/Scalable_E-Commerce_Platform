import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-business-overview',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="overview-container p-4">
      <h2>Business Overview</h2>
      <p>Dashboard statistics and overview will go here.</p>
    </div>
  `,
    styles: []
})
export class BusinessOverviewComponent { }
