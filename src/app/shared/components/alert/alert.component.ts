import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-alert',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent {
    @Input() type: 'success' | 'warning' | 'error' | 'info' = 'info';
    @Input() dismissible: boolean = false;
    @Output() dismiss = new EventEmitter<void>();

    visible: boolean = true;

    get icon(): string {
        switch (this.type) {
            case 'success': return 'check_circle';
            case 'warning': return 'warning';
            case 'error': return 'error';
            case 'info': return 'info';
            default: return 'info';
        }
    }

    get iconSymbol(): string {
        switch (this.type) {
            case 'success': return '✅';
            case 'warning': return '⚠️';
            case 'error': return '❌';
            case 'info': return 'ℹ️';
            default: return 'ℹ️';
        }
    }

    onDismiss() {
        this.visible = false;
        this.dismiss.emit();
    }
}
