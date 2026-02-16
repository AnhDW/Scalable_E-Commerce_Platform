import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-chart',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnChanges {
    @Input() type: 'bar' | 'line' = 'bar';
    @Input() data: { label: string, value: number, color?: string }[] = [];
    @Input() height: number = 300;
    @Input() width: number = 500;
    @Input() title: string = '';

    maxValue: number = 0;
    bars: any[] = [];

    // Grid lines
    gridLines: number[] = [0, 0.25, 0.5, 0.75, 1];

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data'] || changes['height'] || changes['width']) {
            this.calculateChart();
        }
    }

    calculateChart() {
        if (!this.data || this.data.length === 0) return;

        this.maxValue = Math.max(...this.data.map(d => d.value));

        // Add 10% buffering to top
        const topBuffer = this.maxValue * 0.1;
        const effectiveMax = this.maxValue + topBuffer;

        if (this.type === 'bar') {
            const barWidth = (this.width - 60) / this.data.length;
            const gap = barWidth * 0.2;
            const actualBarWidth = barWidth - gap;

            this.bars = this.data.map((d, i) => {
                const barHeight = (d.value / effectiveMax) * (this.height - 40);
                return {
                    x: 40 + i * barWidth + gap / 2,
                    y: (this.height - 20) - barHeight,
                    width: actualBarWidth,
                    height: barHeight,
                    value: d.value,
                    label: d.label,
                    color: d.color || '#3b82f6'
                };
            });
        }
    }
}
