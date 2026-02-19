import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-business-settings',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="settings-container p-4">
      <h2>Business Settings</h2>
      <p>Settings form will go here.</p>
    </div>
  `,
    styles: []
})
export class BusinessSettingsComponent { }
