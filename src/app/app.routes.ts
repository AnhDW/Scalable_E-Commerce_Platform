import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'admin',
        loadComponent: () => import('./layout/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
        children: [
            {
                path: 'users',
                loadComponent: () => import('./features/users/user-list/user-list.component').then(m => m.UserListComponent)
            },
            {
                path: 'users/:id',
                loadComponent: () => import('./features/users/user-detail/user-detail.component').then(m => m.UserDetailComponent)
            },
            {
                path: 'users/:id/roles',
                loadComponent: () => import('./features/users/role-management/role-management.component').then(m => m.RoleManagementComponent)
            },
            {
                path: 'businesses',
                loadComponent: () => import('./features/businesses/business-list/business-list.component').then(m => m.BusinessListComponent)
            },
            {
                path: 'businesses/register',
                loadComponent: () => import('./features/businesses/business-registration/business-registration.component').then(m => m.BusinessRegistrationComponent)
            },
            { path: '', redirectTo: 'users', pathMatch: 'full' }
        ]
    },
    {
        path: 'business',
        loadComponent: () => import('./layout/business-layout/business-layout.component').then(m => m.BusinessLayoutComponent),
        children: [
            // Business routes will go here
        ]
    },
    {
        path: '',
        loadComponent: () => import('./layout/user-layout/user-layout.component').then(m => m.UserLayoutComponent),
        children: [
            // User/Public routes will go here
        ]
    },
    {
        path: 'auth',
        loadComponent: () => import('./layout/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
        children: [
            // Auth routes (login, register) will go here
        ]
    },
    {
        path: 'showcase',
        loadComponent: () => import('./features/showcase/component-showcase.component').then(m => m.ComponentShowcaseComponent)
    },
    { path: '**', redirectTo: '' }
];
