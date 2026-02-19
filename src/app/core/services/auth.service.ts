import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    role: 'user' | 'admin' | 'business';
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor() {
        // Check local storage for existing session (mock)
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            this.currentUserSubject.next(JSON.parse(storedUser));
        }
    }

    login(email: string): void {
        // Mock login
        const user: User = {
            id: '1',
            name: 'John Doe',
            email: email,
            role: 'user',
            avatarUrl: 'https://ui-avatars.com/api/?name=John+Doe&background=random'
        };
        this.currentUserSubject.next(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    logout(): void {
        this.currentUserSubject.next(null);
        localStorage.removeItem('currentUser');
    }

    updateProfile(user: Partial<User>): void {
        const currentUser = this.currentUserSubject.value;
        if (currentUser) {
            const updatedUser = { ...currentUser, ...user };
            this.currentUserSubject.next(updatedUser);
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        }
    }
}
