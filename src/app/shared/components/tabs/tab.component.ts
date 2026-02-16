import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-tab',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div [hidden]="!active" class="tab-pane">
      <ng-content></ng-content>
    </div>
  `
})
export class TabComponent {
    @Input() title: string = '';
    active: boolean = false;
}
