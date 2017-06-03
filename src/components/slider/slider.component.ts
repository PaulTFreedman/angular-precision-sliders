import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, AfterViewInit {

  @ViewChild('sliderHandle') sliderHandle: ElementRef;
  private isDragging: boolean;
  private mouseDownX: number;
  private mouseDownHandleLeft: number;
  private leftPos: number;
  private rightPos: number;
  private conversionFactor: number;
  private handleLeft: number;
  //private handleWidth: number;
  private handleCursorDiff: number;

  //TODO need to sort out rest of svg stuff

  @Input()
  minValue: number;
  @Input()
  maxValue: number;
  @Input()
  initialValue: number;
  @Input()
  handleWidth: number;

  @Output()
  public valueChanged: EventEmitter<number> = new EventEmitter();

  public value: number;
  public handleLeftCss: string;
  public handleTopCss: string;

  constructor(private elRef: ElementRef) {
  }

  ngOnInit() {
    this.isDragging = false;

    if (!this.initialValue) {
      this.initialValue = this.minValue;
    }

    if (this.initialValue > this.maxValue || this.initialValue < this.minValue) {
      this.initialValue = this.minValue;
    }

    this.value = this.initialValue;
  }

  ngAfterViewInit() {
    this.setupSliderView();

    const fraction = this.initialValue / this.maxValue;
    const localLeft = (this.rightPos - this.leftPos) * fraction;

    this.handleLeft = this.leftPos - (this.handleWidth / 2) + localLeft;
    this.mouseDownX = this.handleLeft + (this.handleWidth / 2);

    const sliderMiddleY = this.elRef.nativeElement.offsetTop + (this.elRef.nativeElement.offsetHeight / 2);
    const handleTop = sliderMiddleY - (this.handleWidth / 2);

    setTimeout(() => {
      this.handleLeftCss = this.handleLeft + "px";
      this.handleTopCss = handleTop + "px";
    });
  }

  onHandleMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.mouseDownX = event.clientX;
    const currentLeftVal = getComputedStyle(this.sliderHandle.nativeElement).left;
    this.mouseDownHandleLeft = parseInt(currentLeftVal.substring(0, currentLeftVal.length - 2));

    this.handleCursorDiff = (this.mouseDownHandleLeft + this.handleWidth / 2) - this.mouseDownX;
  }

  onTrackMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.handleCursorDiff = 0;
    this.mouseDownX = event.clientX;
    this.mouseDownHandleLeft = event.clientX - (this.handleWidth / 2);
    this.handleLeftCss = this.mouseDownHandleLeft + "px";
  }

  onMouseOutside(event: MouseEvent) {
    if (event.type === "mousemove") {
      this.onMouseMove(event);
    } else if (event.type === "mouseup") {
      this.onMouseUp();
    }
  }

  onDragStart(event: DragEvent) {
    event.preventDefault();
  }

  onWindowResize(event: any) {
    const localLeft = this.handleLeft - this.leftPos;
    const oldDiff = (localLeft + this.handleWidth / 2);
    const ratio = oldDiff / (this.rightPos - this.leftPos);

    this.setupSliderView();

    const newDiff = (ratio * (this.rightPos - this.leftPos)) - this.handleWidth / 2;
    this.handleLeft = newDiff + this.leftPos;
    this.handleLeftCss = this.handleLeft + 'px';
  }

  private setupSliderView() {    
    this.leftPos = this.elRef.nativeElement.offsetLeft;
    this.rightPos = this.elRef.nativeElement.offsetLeft + this.elRef.nativeElement.offsetWidth;
    this.conversionFactor = ((this.maxValue - this.minValue) / (this.rightPos - this.leftPos));
  }

  private onMouseUp(): void {
    this.isDragging = false;
  }

  private onMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      if (event.clientX > (this.rightPos + (this.handleWidth / 2)) || event.clientX < (this.leftPos) - (this.handleWidth / 2) ) {
        return;
      }

      let handleCentreX = event.clientX + this.handleCursorDiff;
      if (handleCentreX > this.rightPos) {
        handleCentreX = this.rightPos;
      } else if (handleCentreX < this.leftPos) {
        handleCentreX = this.leftPos;
      }

      const diffInPixels = handleCentreX - this.leftPos;
      let calculatedValue = diffInPixels * this.conversionFactor;

      if (calculatedValue > this.maxValue) {
          calculatedValue = this.maxValue;
      } else if (calculatedValue < this.minValue) {
          calculatedValue = this.minValue;
      }

      this.value = calculatedValue;
      this.valueChanged.emit(this.value);

      this.handleLeft = this.leftPos + diffInPixels - (this.handleWidth / 2);
      this.handleLeftCss = this.handleLeft + 'px';
    }
  }
}
