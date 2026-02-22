import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductGridComponent } from '../../shared/components/product-grid/product-grid.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterModule, ProductGridComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    products = [
        { title: 'Tai nghe Bluetooth Sony WH-1000XM5 Chống ồn chủ động đỉnh cao', price: 6990000, oldPrice: 7990000, img: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)', isHot: true, rating: 5, ratingCount: 124 },
        { title: 'MacBook Air M2 2022 8GB/256GB - Chính hãng VN/A', price: 25490000, oldPrice: 29990000, img: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)', discount: 15, rating: 4, ratingCount: 89 },
        { title: 'Bàn phím cơ không dây Keychron K2 Pro Nhôm RGB Hotswap', price: 2450000, img: 'linear-gradient(to right, #f8f9fa 0%, #e9ecef 100%)', rating: 5, ratingCount: 210 },
        { title: 'Ghế công thái học Ergonomic Office Chair Gọn nhẹ sang trọng', price: 3200000, oldPrice: 4500000, img: 'linear-gradient(to right, #fdfbfb 0%, #ebedee 100%)', discount: 29, rating: 4, ratingCount: 56 },
        { title: 'Chuột Không Dây Logitech MX Master 3S', price: 2290000, img: 'linear-gradient(to right, #f8f9fa 0%, #e9ecef 100%)', rating: 5, ratingCount: 543 },
        { title: 'Màn hình Tương tác thông minh LG StanbyME 27 inch', price: 22900000, img: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)', isHot: true, rating: 5, ratingCount: 12 }
    ];
}
