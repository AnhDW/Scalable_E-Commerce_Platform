import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../../../core/services/auth.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-user-profile',
    standalone: true,
    imports: [CommonModule, ButtonComponent],
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
    currentUser$: Observable<User | null>;

    constructor(private authService: AuthService) {
        this.currentUser$ = this.authService.currentUser$;
    }

    ngOnInit(): void {
    }
}
