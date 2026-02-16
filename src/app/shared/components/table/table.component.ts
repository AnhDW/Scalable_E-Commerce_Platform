import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Column {
    key: string;
    label: string;
    sortable?: boolean;
}

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent {
    @Input() data: any[] = [];
    @Input() columns: Column[] = [];
    @Input() striped: boolean = false;
    @Input() hover: boolean = true;

    @Output() rowClick = new EventEmitter<any>();

    onRowClick(row: any) {
        this.rowClick.emit(row);
    }
}
