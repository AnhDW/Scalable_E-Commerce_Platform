import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { AvatarComponent } from '../../shared/components/avatar/avatar.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { TableComponent } from '../../shared/components/table/table.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { ChartComponent } from '../../shared/components/chart/chart.component';
import { TabsComponent } from '../../shared/components/tabs/tabs.component';
import { TabComponent } from '../../shared/components/tabs/tab.component';
import { FileManagerComponent } from '../../shared/components/file-manager/file-manager.component';
import { ImageComponent } from '../../shared/components/image/image.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { ToastService } from '../../shared/services/toast.service';

@Component({
    selector: 'app-component-showcase',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ButtonComponent,
        AvatarComponent,
        CardComponent,
        TableComponent,
        InputComponent,
        ChartComponent,
        TabsComponent,
        TabComponent,
        FileManagerComponent,
        ImageComponent,
        ModalComponent,
        AlertComponent
    ],
    templateUrl: './component-showcase.component.html',
    styleUrls: ['./component-showcase.component.css']
})
export class ComponentShowcaseComponent {
    // Input Data
    inputValue: string = '';

    // Table Data
    tableColumns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'role', label: 'Role' },
        { key: 'status', label: 'Status' }
    ];

    tableData = [
        { id: 1, name: 'John Doe', role: 'Admin', status: 'Active' },
        { id: 2, name: 'Jane Smith', role: 'User', status: 'Inactive' },
        { id: 3, name: 'Bob Johnson', role: 'Editor', status: 'Active' },
    ];

    // Chart Data
    barChartData = [
        { label: 'Jan', value: 65, color: '#3b82f6' },
        { label: 'Feb', value: 59, color: '#3b82f6' },
        { label: 'Mar', value: 80, color: '#3b82f6' },
        { label: 'Apr', value: 81, color: '#3b82f6' },
        { label: 'May', value: 56, color: '#3b82f6' },
        { label: 'Jun', value: 55, color: '#3b82f6' },
        { label: 'Jul', value: 40, color: '#3b82f6' },
    ];

    // Modal
    isModalOpen = false;

    constructor(private toastService: ToastService) { }

    openModal() {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }

    saveModal() {
        console.log('Modal saved!');
        this.closeModal();
        this.showToast('success', 'Changes saved successfully!');
    }

    // Toasts
    showToast(type: 'success' | 'info' | 'warning' | 'error', message: string) {
        this.toastService.show(type, message);
    }

    onButtonClick(event: Event) {
        console.log('Button clicked!', event);
        this.showToast('info', 'Button clicked!');
    }

    onRowClick(row: any) {
        console.log('Row clicked:', row);
        this.showToast('info', `Row clicked: ${row.name}`);
    }
}
