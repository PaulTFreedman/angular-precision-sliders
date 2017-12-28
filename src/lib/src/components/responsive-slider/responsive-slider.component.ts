import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { SliderComponent } from '../slider/slider.component';

@Component({
  selector: 'aps-responsive-slider',
  templateUrl: './responsive-slider.component.html',
  styleUrls: ['./responsive-slider.component.less']
})
export class ResponsiveSliderComponent extends SliderComponent implements OnInit {

  @ViewChild('sliderHandle') sliderHandle: ElementRef;
  private isDragging: boolean;
  private handleCursorOffset: number;

  @Output()
  public valueChanged: EventEmitter<number> = new EventEmitter();

  ngOnInit() {
    this.isDragging = false;

    if (!this.initialValue) {
      this.initialValue = this.minValue;
    }

    if (this.initialValue > this.maxValue || this.initialValue < this.minValue) {
      this.initialValue = this.minValue;
    }

    setTimeout(() => {
        this.valueChanged.emit(this.initialValue);
    });
  }

  onHandleMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.handleCursorOffset = event.offsetX - (this.handleWidth / 2);
  }

  onTrackMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.handleCursorOffset = 0;
    this.mouseDownX = event.clientX;
    this.handleLeft = this.mouseDownX - (this.handleWidth / 2) - this.leftPos;
    this.handleLeftCss = this.handleLeft + 'px';

    const calculatedValue = (this.mouseDownX - this.leftPos) * this.conversionFactor;
    this.valueChanged.emit(calculatedValue);
  }

  onMouseOutside(event: MouseEvent) {
    if (event.type === 'mousemove') {
      this.onMouseMove(event);
    } else if (event.type === 'mouseup') {
      this.onMouseUp();
    }
  }

  private onMouseUp(): void {
    this.isDragging = false;
  }

  private onMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      let mouseX = event.clientX;

      if (mouseX > (this.rightPos + this.handleCursorOffset)) {
        mouseX = this.rightPos + this.handleCursorOffset;
      } else if (mouseX < (this.leftPos + this.handleCursorOffset)) {
        mouseX = this.leftPos + this.handleCursorOffset;
      }

      const handleToLeftDiff = mouseX - this.leftPos - this.handleCursorOffset;
      let calculatedValue = (handleToLeftDiff * this.conversionFactor) + this.minValue;

      if (calculatedValue > this.maxValue) {
        calculatedValue = this.maxValue;
      } else if (calculatedValue < this.minValue) {
          calculatedValue = this.minValue;
      }

      this.valueChanged.emit(calculatedValue); // TODO only emit if value is different to previous one?

      this.updateHandleHorizontalOffset(handleToLeftDiff);
    }
  }
}
