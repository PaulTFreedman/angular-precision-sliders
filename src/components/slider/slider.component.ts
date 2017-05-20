import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

//TODO Set handle height dynamically (onInit and onResize)


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
  private value: number;
  
  private leftPos: number;
  private rightPos: number;
  private conversionFactor: number;
  private handleLeft: number;
  private handleWidth: number;
  
  @Input()
  minValue: number;
  @Input()
  maxValue: number;
  @Input()
  initialValue: number;

  @Output()
  private valueChanged: EventEmitter<number> = new EventEmitter();

  public handleLeftCss: string;

  constructor(private elRef: ElementRef) {    
  }

  ngOnInit() {
    this.isDragging = false;
    this.value = this.initialValue;
    this.valueChanged.emit(this.value);
  }

  ngAfterViewInit() {
    this.setupSliderView();

    var fraction = this.initialValue / this.maxValue;
    var localLeft = (this.rightPos - this.leftPos) * fraction;

    this.handleLeft = this.leftPos - (this.handleWidth/2) + localLeft;
    
    setTimeout(() => {
      this.handleLeftCss = this.handleLeft + "px";
    });
  }
  
  onHandleMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.mouseDownX = event.clientX;
    var currentLeftVal = getComputedStyle(this.sliderHandle.nativeElement).left;
    this.mouseDownHandleLeft = parseInt(currentLeftVal.substring(0, currentLeftVal.length - 2));
  }

  onTrackMouseDown(event: MouseEvent) {
    this.isDragging = true;
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
    var localLeft = this.handleLeft - this.leftPos;
    var oldDiff = (localLeft + this.handleWidth/2);
    var ratio = oldDiff / (this.rightPos - this.leftPos);

    this.setupSliderView();
    
    var newDiff = (ratio * (this.rightPos - this.leftPos)) - this.handleWidth/2;
    this.handleLeft = newDiff + this.leftPos;
    this.handleLeftCss = this.handleLeft + 'px';
  }
  
  private setupSliderView() {
    this.leftPos = this.elRef.nativeElement.offsetLeft;
    this.rightPos = this.elRef.nativeElement.offsetLeft + this.elRef.nativeElement.offsetWidth;
    this.conversionFactor = ((this.maxValue - this.minValue) / (this.rightPos - this.leftPos));
    this.handleWidth = this.sliderHandle.nativeElement.offsetWidth;
  }
  
  private onMouseUp(): void {
    this.isDragging = false;
  }

  private onMouseMove(event: MouseEvent): void {
    if(this.isDragging) {
      if (event.clientX > this.rightPos || event.clientX < this.leftPos) {
        return;
      }

      var diffInPixels = event.clientX - this.leftPos;
      this.value = diffInPixels * this.conversionFactor;
      this.valueChanged.emit(this.value);
      
      var mouseDownDiff = event.clientX - this.mouseDownX; /* prevent handle from jumping on click*/
      this.handleLeft = this.mouseDownHandleLeft + mouseDownDiff;
      this.handleLeftCss = this.handleLeft + 'px';
    }
  }
}