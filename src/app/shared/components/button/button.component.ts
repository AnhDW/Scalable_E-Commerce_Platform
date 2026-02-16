import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-button',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.css']
})
export class ButtonComponent {
    @Input() variant: 'primary' | 'secondary' | 'danger' | 'success' | 'outline' = 'primary';
    @Input() size: 'sm' | 'md' | 'lg' = 'md';
    @Input() disabled: boolean = false;
    @Input() type: 'button' | 'submit' | 'reset' = 'button';
    @Input() block: boolean = false;

    @Output() onClick = new EventEmitter<Event>();

    get classes(): string {
        return `btn btn-${this.variant} btn-${this.size} ${this.block ? 'btn-block' : ''}`;
    }

    handleClick(event: Event) {
        if (!this.disabled) {
            this.onClick.emit(event);
        }
    }
}
