import { Component } from '@angular/core';
import { RangeSlider } from '../range-slider/range-slider';
import { signal, output, effect } from '@angular/core';
@Component({
  selector: 'app-chat-header',
  imports: [RangeSlider],
  templateUrl: './chat-header.html',
  styleUrl: './chat-header.css',
})
export class ChatHeader {
  readonly sliderValue = signal<number>(0.8);
  readonly sliderValueChange = output<number>();
  readonly menuOpen = signal(false);
  constructor() {
    effect(() => {
      this.sliderValueChange.emit(this.sliderValue());
    })
  }
}
