import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
    selector: 'app-product-grid',
    standalone: true,
    imports: [CommonModule, ProductCardComponent],
    templateUrl: './product-grid.component.html',
    styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent {
    @Input() products: any[] = [];
}
