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
    super.ngOnInit();

    this.isDragging = false;

    if (!this.initialValue) {
      this.initialValue = this.minValue;
    }

    if (this.initialValue > this.maxValue) {
      this.initialValue = this.maxValue;
    } else if (this.initialValue < this.minValue) {
      this.initialValue = this.minValue;
    }

    setTimeout(() => {
        this.valueChanged.emit(this.initialValue);
    });
  }

  private onMouseOutside(event: any) {
    if (event.type === 'mousemove') {
      this.onMouseMove(event);
    } else if (event.type === 'touchmove') {
      this.onTouchMove(event);
    } else if (event.type === 'mouseup' || event.type === 'touchend') {
      this.onMouseUp();
    }
  }

  private onMouseMove(event: MouseEvent): void {
    this.updateSlider(event.clientX);
  }

  private onTouchMove(event: TouchEvent) {
    const xPos = event.touches ? event.touches[0].clientX : -1;
    this.updateSlider(xPos);
  }

  private onMouseUp(): void {
    this.isDragging = false;
  }

  private updateSlider(mouseX: number): void {
    if (this.isDragging) {
      if (mouseX < 0) {
        return;
      }

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

  private onHandleMouseDown(event: MouseEvent) {
    this.dragStart(event.offsetX);
  }

  private onHandleTouch(event: TouchEvent) {
    event.preventDefault();

    // TODO make sure this seems right
    const offsetX = event.touches ? (event.touches[0].clientX - this.handleLeft) : -1;
    this.dragStart(offsetX);
  }

  private dragStart(offsetX: number) {
    if (offsetX < 0) {
      return;
    }

    this.isDragging = true;
    this.handleCursorOffset = offsetX - (this.handleWidth / 2);
  }

  private onTrackMouseDown(event: any) {
    this.isDragging = true;
    this.handleCursorOffset = 0;
    this.mouseDownX = event.clientX || event.touches[0].clientX;
    this.handleLeft = this.mouseDownX - (this.handleWidth / 2) - this.leftPos;
    this.handleLeftCss = this.handleLeft + 'px';

    const calculatedValue = (this.mouseDownX - this.leftPos) * this.conversionFactor;
    this.valueChanged.emit(calculatedValue);
  }
}
