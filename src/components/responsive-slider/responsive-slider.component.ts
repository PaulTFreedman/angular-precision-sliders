import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { SliderComponent } from '../slider/slider.component';

@Component({
  selector: 'responsive-slider',
  templateUrl: './responsive-slider.component.html',
  styleUrls: ['./responsive-slider.component.less']
})
export class ResponsiveSliderComponent extends SliderComponent implements OnInit {

  @ViewChild('sliderHandle') sliderHandle: ElementRef;
  private isDragging: boolean;
  private mouseDownHandleLeft: number;

  //TODO need to sort out rest of svg stuff
  
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
    this.mouseDownX = event.offsetX;
    const currentLeftVal = getComputedStyle(this.sliderHandle.nativeElement).left;
    this.mouseDownHandleLeft = parseInt(currentLeftVal);
  }

  onTrackMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.mouseDownX = event.clientX;
    this.mouseDownHandleLeft = this.mouseDownX - this.leftPos;
    this.handleLeftCss = this.mouseDownHandleLeft + "px";
    
    var calculatedValue = (this.mouseDownX - this.leftPos) * this.conversionFactor;
    this.valueChanged.emit(calculatedValue);
  }

  onMouseOutside(event: MouseEvent) {
    if (event.type === "mousemove") {
      this.onMouseMove(event);
    } else if (event.type === "mouseup") {
      this.onMouseUp();
    }
  }

  private onMouseUp(): void {
    this.isDragging = false;
  }

  private onMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      if (event.clientX > (this.leftPos + this.rightPos + (this.handleWidth / 2)) || event.clientX < (this.leftPos) - (this.handleWidth / 2) ) {
        return;
      }

      let handleCentreX = event.clientX;
      if (handleCentreX > this.rightPos) {
        handleCentreX = this.rightPos;
      } else if (handleCentreX < this.leftPos) {
        handleCentreX = this.leftPos;
      }

      const handleToLeftDiff = handleCentreX - this.leftPos;
      let calculatedValue = (handleToLeftDiff * this.conversionFactor) + this.minValue;
      
      if (calculatedValue > this.maxValue) {
        calculatedValue = this.maxValue;
      } else if (calculatedValue < this.minValue) {
          calculatedValue = this.minValue;
      }

      this.valueChanged.emit(calculatedValue);

      this.updateHandleHorizontalOffset(handleToLeftDiff);
    }
  }
}
