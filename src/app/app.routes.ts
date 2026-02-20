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
            {
                path: '',
                loadComponent: () => import('./features/business-management/my-business-list/my-business-list.component').then(m => m.MyBusinessListComponent)
            },
            {
                path: ':id',
                loadComponent: () => import('./features/business-management/business-dashboard/business-dashboard.component').then(m => m.BusinessDashboardComponent),
                children: [
                    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                    {
                        path: 'dashboard',
                        loadComponent: () => import('./features/business-management/business-overview/business-overview.component').then(m => m.BusinessOverviewComponent)
                    },
                    {
                        path: 'team',
                        loadComponent: () => import('./features/business-management/business-team/business-team.component').then(m => m.BusinessTeamComponent)
                    },
                    {
                        path: 'settings',
                        loadComponent: () => import('./features/business-management/business-settings/business-settings.component').then(m => m.BusinessSettingsComponent)
                    }
                ]
            }
        ]
    },
    {
        path: '',
        loadComponent: () => import('./layout/user-layout/user-layout.component').then(m => m.UserLayoutComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
            },
            {
                path: 'profile',
                loadComponent: () => import('./features/users/user-profile/user-profile.component').then(m => m.UserProfileComponent)
            },
            {
                path: 'store/:id',
                loadComponent: () => import('./features/store/store-detail/store-detail.component').then(m => m.StoreDetailComponent)
            },
            {
                path: 'product/:id',
                loadComponent: () => import('./features/product/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
            }
        ]
    },
    {
        path: 'auth',
        loadComponent: () => import('./layout/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
        children: [
            {
                path: 'login',
                loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
            },
            {
                path: 'register',
                loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
            },
            { path: '', redirectTo: 'login', pathMatch: 'full' }
        ]
    },
    {
        path: 'showcase',
        loadComponent: () => import('./features/showcase/component-showcase.component').then(m => m.ComponentShowcaseComponent)
    },
    { path: '**', redirectTo: '' }
];
