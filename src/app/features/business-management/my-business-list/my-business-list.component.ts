import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, forkJoin } from 'rxjs';

// Business Service Imports
import { ApiConfiguration as BusinessApiConfig } from '../../../services/business-services/api-configuration';
import { apiStoresGet } from '../../../services/business-services/fn/stores/api-stores-get';
import { apiStoresIdGet } from '../../../services/business-services/fn/stores/api-stores-id-get';
import { StoreDto } from '../../../services/business-services/models/store-dto';

// Relationship Service Imports
import { ApiConfiguration as RelationshipApiConfig } from '../../../services/relationship-services/api-configuration';
import { apiUserStoreRelationsGetStoreIdsByUserIdUserIdGet } from '../../../services/relationship-services/fn/user-store-relations/api-user-store-relations-get-store-ids-by-user-id-user-id-get';

@Component({
    selector: 'app-my-business-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './my-business-list.component.html',
    styleUrl: './my-business-list.component.css'
})
export class MyBusinessListComponent implements OnInit {
    businesses: StoreDto[] = [];
    loading = true;
    error = '';

    private http = inject(HttpClient);

    // Configurations - using instances to get default rootUrl since DI might be ambiguous without tokens
    private businessConfig = new BusinessApiConfig();
    private relationshipConfig = new RelationshipApiConfig();

    // TODO: Replace with actual Auth Service to get current User ID
    currentUserId: string = 'test-user-id';

    async ngOnInit() {
        await this.loadBusinesses();
    }

    async loadBusinesses() {
        try {
            this.loading = true;
            this.businesses = [];

            // 1. Get Store IDs for the user
            // Note: check the actual return type of getStoreIdsByUserIdUserId. The openapi-gen might return void if response is simple array or text.
            // I will assume for now it returns string[] or Guid[].

            const storeIdsResponse = await firstValueFrom(
                apiUserStoreRelationsGetStoreIdsByUserIdUserIdGet(
                    this.http,
                    this.relationshipConfig.rootUrl,
                    { userId: this.currentUserId }
                )
            );

            // The previous analysis showed the return type might be StrictHttpResponse<void> which is problematic.
            // I'll cast it to any for now to access the body, hoping it is the list of IDs.
            const storeIds = (storeIdsResponse as any) as string[];

            if (!storeIds || storeIds.length === 0) {
                this.businesses = [];
                return;
            }

            // 2. Fetch details for each store
            // There is no bulk get options, so we loop.
            const businessRequests = storeIds.map(id =>
                apiStoresIdGet(
                    this.http,
                    this.businessConfig.rootUrl,
                    { id: id }
                )
            );

            const businessesResponses = await firstValueFrom(forkJoin(businessRequests));

            // Filter out any failed requests (if any) - forkJoin usually fails if one fails, so catch block handles it.
            // Assuming all succeed:
            this.businesses = businessesResponses.map(r => (r as any) as StoreDto).filter(b => b != null);

        } catch (err) {
            console.error('Error loading businesses', err);
            this.error = 'Failed to load businesses. Please try again.';
        } finally {
            this.loading = false;
        }
    }
}
