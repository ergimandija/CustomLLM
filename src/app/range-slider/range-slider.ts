import {
  Component, ElementRef, EventEmitter, HostListener, Output, ViewChild, input, 
  
} from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  imports: [CommonModule],
  selector: 'app-range-slider',
  templateUrl: './range-slider.html',
  styleUrl: './range-slider.css'
})
export class RangeSlider {
  min = input<number>(0);
  max = input<number>(1);
  step = input<number>(0.01);
  value = input<number>(0);
  @Output() valueChange = new EventEmitter<number>();

  @ViewChild('track', { static: true }) trackRef!: ElementRef<HTMLDivElement>;

  private dragging = false;

  get percent(): number {
    return ((this.value() - this.min()) / (this.max() - this.min())) * 100;
  }

  get ticks(): { value: number; percent: number }[] {
    const result = [];
    for (let v = this.min(); v <= this.max() + 1e-9; v += this.step()) {
      const rounded = Math.round(v * 100) / 100;
      result.push({
        value: rounded,
        percent: ((rounded - this.min()) / (this.max() - this.min())) * 100,
      });
    }
    return result;
  }

  onPointerDown(event: PointerEvent) {
    this.dragging = true;
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
    event.preventDefault();
  }

  onTrackClick(event: MouseEvent) {
    this.updateFromClientX(event.clientX);
  }

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(event: PointerEvent) {
    if (!this.dragging) return;
    this.updateFromClientX(event.clientX);
  }

  @HostListener('document:pointerup')
  onPointerUp() {
    this.dragging = false;
  }

  onKeyDown(event: KeyboardEvent) {
    let newValue = this.value();
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      newValue = Math.min(this.max(), newValue + this.step());
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      newValue = Math.max(this.min(), newValue - this.step());
    } else if (event.key === 'Home') {
      newValue = this.min();
    } else if (event.key === 'End') {
      newValue = this.max();
    } else {
      return;
    }
    event.preventDefault();
    this.setValue(newValue);
  }

  private updateFromClientX(clientX: number) {
    const rect = this.trackRef.nativeElement.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const raw = this.min() + ratio * (this.max() - this.min());
    const stepped = Math.round(raw / this.step()) * this.step();
    const clamped = Math.min(this.max(), Math.max(this.min(), stepped));
    this.setValue(Math.round(clamped * 100) / 100);
  }

  private setValue(v: number) {
    if (v !== this.value()) {
      this.valueChange.emit(v);
    }
  }
}