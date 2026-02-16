import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-avatar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnChanges {
    @Input() src: string | null = null;
    @Input() alt: string = 'User Avatar';
    @Input() initials: string = '';
    @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
    @Input() shape: 'circle' | 'square' | 'rounded' = 'circle';

    displayInitials: string = '';
    showImage: boolean = true;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['initials']) {
            this.displayInitials = this.initials.slice(0, 2).toUpperCase();
        }
    }

    handleError() {
        this.showImage = false;
    }
}
