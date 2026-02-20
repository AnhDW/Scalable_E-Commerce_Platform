import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-product-detail',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
    product = {
        title: 'MacBook Air M2 2022 8GB/256GB - Chính hãng VN/A',
        fullPrice: 29990000,
        price: 25490000,
        discount: 15,
        rating: 4.8,
        reviews: 89,
        sold: 234,
        images: [
            'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',
            'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
            'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(to right, #f8f9fa 0%, #e9ecef 100%)'
        ],
        selectedImageIndex: 0,
        colors: ['Midnight', 'Starlight', 'Space Gray', 'Silver'],
        selectedColor: 'Midnight',
        options: ['8GB/256GB', '8GB/512GB', '16GB/256GB'],
        selectedOption: '8GB/256GB',
        quantity: 1,
        description: `Apple MacBook Air M2 2022 mang thiết kế lột xác hoàn toàn mới, trang bị vi xử lý Apple M2 siêu mạnh mẽ cùng thời lượng pin ấn tượng, xứng đáng là chiếc laptop sang trọng và hiện đại bậc nhất hiện nay.
    
    Đặc điểm nổi bật:
    - Chip M2 với CPU 8 lõi và GPU 8 lõi cho hiệu năng vượt trội.
    - Màn hình Liquid Retina 13.6 inch siêu nét với độ sáng 500 nits.
    - Camera FaceTime HD 1080p sắc nét cho các cuộc gọi video hoàn hảo.
    - Hệ thống âm thanh 4 loa hỗ trợ Spatial Audio.
    - Cổng sạc MagSafe tiện lợi và 2 cổng Thunderbolt.`,
        specs: [
            { name: 'Màn hình', value: '13.6 inch Liquid Retina' },
            { name: 'CPU', value: 'Apple M2 8 nhân' },
            { name: 'RAM', value: '8 GB' },
            { name: 'Ổ cứng', value: '256 GB SSD' },
            { name: 'Khối lượng', value: '1.24 kg' }
        ],
        store: {
            name: 'TechZone Official',
            avatar: 'TZ',
            followers: '15.4k'
        }
    };

    selectImage(index: number) {
        this.product.selectedImageIndex = index;
    }

    selectColor(color: string) {
        this.product.selectedColor = color;
    }

    selectOption(option: string) {
        this.product.selectedOption = option;
    }

    increaseQuantity() {
        this.product.quantity++;
    }

    decreaseQuantity() {
        if (this.product.quantity > 1) {
            this.product.quantity--;
        }
    }
}
