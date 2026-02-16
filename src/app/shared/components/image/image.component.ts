import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-image',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.css']
})
export class ImageComponent {
    @Input() src: string = '';
    @Input() alt: string = '';
    @Input() width: string = '100%';
    @Input() height: string = 'auto';
    @Input() objectFit: 'cover' | 'contain' | 'fill' = 'cover';

    isLoading: boolean = true;
    hasError: boolean = false;

    onLoad() {
        this.isLoading = false;
    }

    onError() {
        this.isLoading = false;
        this.hasError = true;
    }
}
