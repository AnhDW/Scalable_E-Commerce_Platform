import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent {
    @Input() title: string = '';
    @Input() isOpen: boolean = false;
    @Output() onClose = new EventEmitter<void>();

    close() {
        this.isOpen = false;
        this.onClose.emit();
    }

    @HostListener('document:keydown.escape', ['$event'])
    onKeydownHandler(event: any) {
        if (this.isOpen) {
            this.close();
        }
    }

    onBackdropClick(event: MouseEvent) {
        if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
            this.close();
        }
    }
}
