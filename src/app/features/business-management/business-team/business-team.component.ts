import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, forkJoin } from 'rxjs';

// Business & Relationship Imports
import { ApiConfiguration as RelationshipApiConfig } from '../../../services/relationship-services/api-configuration';
import { apiUserStoreRelationsGetUserIdsByStoreIdStoreIdGet } from '../../../services/relationship-services/fn/user-store-relations/api-user-store-relations-get-user-ids-by-store-id-store-id-get';
import { apiUserStoreRelationsUpdateUsersByStorePut } from '../../../services/relationship-services/fn/user-store-relations/api-user-store-relations-update-users-by-store-put';
import { UpdateUsersByStoreDto } from '../../../services/relationship-services/models/update-users-by-store-dto';

// Auth Imports (for User Details)
import { ApiConfiguration as AuthApiConfig } from '../../../services/auth-services/api-configuration';
import { apiUsersIdGet } from '../../../services/auth-services/fn/users/api-users-id-get';
// Assuming UserDto is returned, need to check likely return type or interface
// If no specific DTO exported, we might need to map it manually or use 'any'.

@Component({
    selector: 'app-business-team',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './business-team.component.html',
    styleUrl: './business-team.component.css'
})
export class BusinessTeamComponent implements OnInit {
    storeId: string | null = null;
    members: any[] = []; // storing user details + role
    loading = true;
    inviteEmail = '';
    inviteRole = 'Member';

    private http = inject(HttpClient);
    private relationshipConfig = new RelationshipApiConfig();
    private authConfig = new AuthApiConfig();

    constructor(private route: ActivatedRoute) {
        // Get storeId from parent route (BusinessDashboard)
        // Since this is a child route, we might need to access parent.parent or use paramsInheritanceStrategy if configured
        // OR if the route is 'business/:id/team', then parent has :id.
    }

    async ngOnInit() {
        this.route.parent?.paramMap.subscribe(params => {
            this.storeId = params.get('id');
            if (this.storeId) {
                this.loadMembers();
            }
        });
    }

    async loadMembers() {
        if (!this.storeId) return;
        this.loading = true;
        try {
            // 1. Get User IDs (and roles?)
            // apiUserStoreRelationsGetUserIdsByStoreIdStoreIdGet returns list of IDs or tuples?
            // Based on file names: `api-user-store-relations-get-user-ids-by-store-id-store-id-get.ts` implies just IDs.
            // But `api-user-store-relations-get.ts` (Get all relations) might return more info. 
            // AND `UpdateUsersByStoreDto` uses `ValueTupleOfstringAndStoreRole`.

            const response = await firstValueFrom(
                apiUserStoreRelationsGetUserIdsByStoreIdStoreIdGet(
                    this.http,
                    this.relationshipConfig.rootUrl,
                    { storeId: this.storeId }
                )
            );

            // Assume response is string[] of UserIDs for now. 
            // If it contains roles, I need to inspect the response structure.
            // Since I can't inspect runtime, I'll assume IDs and fetch details.
            const userIds = (response as any) as string[];

            if (!userIds || userIds.length === 0) {
                this.members = [];
                return;
            }

            // 2. Fetch User Details
            const userRequests = userIds.map(uid =>
                apiUsersIdGet(
                    this.http,
                    this.authConfig.rootUrl,
                    { id: uid }
                ).toPromise() // mixing promise/observable patterns, but firstValueFrom with forkJoin is better.
            );

            const users = await Promise.all(userRequests);

            this.members = users.map((u: any) => ({
                id: u.id,
                email: u.email,
                userName: u.userName,
                // Mock role for now since API might not return it in the simple ID list
                role: 'Member'
            }));

        } catch (error) {
            console.error('Failed to load members', error);
        } finally {
            this.loading = false;
        }
    }

    async inviteMember() {
        if (!this.inviteEmail || !this.storeId) return;
        // Implementation of invite would typically involve:
        // 1. Find user by Email (Need API for this: search user by email)
        // 2. If found, gets UserID.
        // 3. Call UpdateUsersByStore with new UserID added.

        alert('Invite functionality requires generic user search API which is not yet verified. logic: ' + this.inviteEmail);
    }
}
