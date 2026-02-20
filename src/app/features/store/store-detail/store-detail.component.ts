import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-store-detail',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './store-detail.component.html',
    styleUrls: ['./store-detail.component.css']
})
export class StoreDetailComponent {
    // Mock Data for Store
    store = {
        name: 'TechZone Official',
        avatar: 'TZ',
        coverImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        description: 'Chuyên cung cấp các sản phẩm công nghệ chính hãng, uy tín hàng đầu. Cam kết chất lượng và dịch vụ hậu mãi tốt nhất!',
        followers: 15420,
        rating: 4.8,
        joinedDate: 'Tháng 10, 2021',
        productsCount: 345
    };

    products = [
        { title: 'Laptop Gaming Acer Nitro 5', price: 18990000, oldPrice: 22990000, img: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)', isHot: true },
        { title: 'Tai nghe Bluetooth Sony WH-1000XM5', price: 6990000, oldPrice: 8990000, img: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)', discount: 22 },
        { title: 'Chuột Không Dây Logitech MX Master 3S', price: 2290000, oldPrice: 2890000, img: 'linear-gradient(to right, #f8f9fa 0%, #e9ecef 100%)', isHot: false },
        { title: 'Bàn phím cơ không dây Keychron K2 Pro', price: 2450000, oldPrice: null, img: 'linear-gradient(to right, #fdfbfb 0%, #ebedee 100%)', isHot: false }
    ];
}
