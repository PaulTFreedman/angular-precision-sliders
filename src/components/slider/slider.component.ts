import { Component, AfterViewInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.less']
})
export class SliderComponent implements AfterViewInit {
    
    @Input()
    minValue: number;
    @Input()
    maxValue: number;
    @Input()
    initialValue: number;
    @Input()
    handleWidth: number;
    @Input()
    bottomColour: string;
    @Input()
    middleColour: string;
    @Input()
    topColour: string;
    @Input()
    bottomFlexGrow: number;
    @Input()
    middleFlexGrow: number;
    @Input()
    topFlexGrow: number;

    protected leftPos: number;
    protected rightPos: number;
    protected handleLeft: number;
    protected mouseDownX: number;
    protected conversionFactor: number;

    private initialHandleTop: number;

    public handleLeftCss: string;
    public handleTopCss: string;
    
    constructor(protected elRef: ElementRef) { }
    
    ngAfterViewInit() {
        this.setupSliderView();

        const fraction = this.initialValue / this.maxValue;
        const localLeft = (this.rightPos - this.leftPos) * fraction;

        this.handleLeft = this.leftPos - (this.handleWidth / 2) + localLeft;
        this.mouseDownX = this.handleLeft + (this.handleWidth / 2);

        const sliderMiddleY = this.elRef.nativeElement.offsetTop + (this.elRef.nativeElement.offsetHeight / 2);
        this.initialHandleTop = sliderMiddleY - (this.handleWidth / 2);

        setTimeout(() => {
            this.handleLeftCss = this.handleLeft + "px";
            this.handleTopCss = this.initialHandleTop + "px";
        });
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

    @Input()
    set value(newValue: number) {
        if (newValue > this.maxValue) {
            newValue = this.maxValue;
        } else if (newValue < this.minValue) {
            newValue = this.minValue;
        }

        // Do not assume both sliders are exactly aligned
        var handleToLeftDiff = newValue / this.conversionFactor;
        this.updateHandleHorizontalOffset(handleToLeftDiff);
    }

    @Input()
    set verticalOffset(diff: number) {
        this.handleTopCss = this.initialHandleTop + diff + "px";
        this.setupSliderView();
    }
    
    updateHandleHorizontalOffset(diffInPixels: number) {
        this.handleLeft = this.leftPos + diffInPixels - (this.handleWidth / 2);
        this.handleLeftCss = this.handleLeft + 'px';
    }

    setupSliderView() {
        // TODO get these to be in global space
        // this.leftPos = this.elRef.nativeElement.offsetLeft;
        // this.rightPos = this.elRef.nativeElement.offsetLeft + this.elRef.nativeElement.offsetWidth;
        this.leftPos = this.elRef.nativeElement.getBoundingClientRect().left;
        this.rightPos = this.elRef.nativeElement.offsetLeft + this.elRef.nativeElement.offsetWidth;

        console.log('leftPos', this.leftPos);
        console.log('rightPos', this.rightPos);
        console.log('computedLeft', getComputedStyle(this.elRef.nativeElement));
        console.log('boundingRect', this.elRef.nativeElement.getBoundingClientRect());

        this.conversionFactor = ((this.maxValue - this.minValue) / (this.rightPos - this.leftPos));
    }
}