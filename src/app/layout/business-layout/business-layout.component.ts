
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-business-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './business-layout.component.html',
  styleUrls: ['./business-layout.component.css']
})
export class BusinessLayoutComponent { }
