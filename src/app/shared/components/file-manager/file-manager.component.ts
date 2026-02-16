import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

export interface FileItem {
    id: string;
    name: string;
    type: 'folder' | 'file';
    size?: string;
    dateStr?: string;
    icon?: string;
}

@Component({
    selector: 'app-file-manager',
    standalone: true,
    imports: [CommonModule, ButtonComponent],
    templateUrl: './file-manager.component.html',
    styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent {
    @Input() files: FileItem[] = [
        { id: '1', name: 'Documents', type: 'folder', dateStr: '2024-02-16', icon: '📁' },
        { id: '2', name: 'Images', type: 'folder', dateStr: '2024-02-15', icon: '📁' },
        { id: '3', name: 'project-plan.pdf', type: 'file', size: '2.5 MB', dateStr: '2024-02-14', icon: '📄' },
        { id: '4', name: 'logo.png', type: 'file', size: '150 KB', dateStr: '2024-02-13', icon: '🖼️' },
    ];

    @Input() currentPath: string = '/Home';

    onFileClick(file: FileItem) {
        if (file.type === 'folder') {
            console.log('Navigate to folder:', file.name);
            // Logic to navigate folders would go here
        } else {
            console.log('Open file:', file.name);
            // Logic to open/download file would go here
        }
    }

    onUpload() {
        console.log('Upload clicked');
        // Upload logic
    }
}
