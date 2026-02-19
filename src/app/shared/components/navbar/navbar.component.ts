import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService, User } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { ButtonComponent } from '../button/button.component';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive, ButtonComponent],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    isMenuOpen = false;
    isProfileDropdownOpen = false;
    currentUser$: Observable<User | null>;

    constructor(public authService: AuthService) {
        this.currentUser$ = this.authService.currentUser$;
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }

    closeMenu() {
        this.isMenuOpen = false;
        this.isProfileDropdownOpen = false;
    }

    toggleProfileDropdown() {
        this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
    }

    logout() {
        this.authService.logout();
        this.isProfileDropdownOpen = false;
    }
}
