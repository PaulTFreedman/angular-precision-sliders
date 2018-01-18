import { Component, AfterViewInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'aps-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.less']
})
export class SliderComponent implements OnInit, AfterViewInit {
    @Input()
    minValue: number;
    @Input()
    maxValue: number;
    @Input()
    initialValue: number;
    @Input()
    handleWidth: number;
    @Input()
    trackHeight: number;
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
    @Input()
    handleFill: string;

    @ViewChild('sliderBar') sliderBar: ElementRef;

    @Output()
    width: number;

    protected leftPos: number;
    protected rightPos: number;
    protected handleLeft: number;
    protected mouseDownX: number;
    protected conversionFactor: number;

    private initialHandleTop: number;

    public handleLeftCss: string;
    public handleTopCss: string;
    public trackHeightCss: string;

    constructor(protected elRef: ElementRef) { }

    ngOnInit() {
        this.trackHeightCss = this.trackHeight + 'px';
    };

    ngAfterViewInit() {
        setTimeout(() => {
            this.setupSliderView();

            const fraction = this.initialValue / this.maxValue;
            this.handleLeft = ((this.rightPos - this.leftPos) * fraction) - (this.handleWidth / 2);
            this.mouseDownX = this.handleLeft;

            const sliderMiddleY = this.sliderBar.nativeElement.offsetTop + (this.sliderBar.nativeElement.offsetHeight / 2);
            this.initialHandleTop = sliderMiddleY - (this.handleWidth / 2);

            this.width = this.sliderBar.nativeElement.offsetWidth;

            this.handleLeftCss = this.handleLeft + 'px';
            this.handleTopCss = this.initialHandleTop + 'px';
        });
    }

    onDragStart(event: DragEvent) {
        event.preventDefault();
    }

    onWindowResize(event: any) {
        const oldDiff = (this.handleLeft + this.handleWidth / 2);
        const ratio = oldDiff / (this.rightPos - this.leftPos);

        this.setupSliderView();

        const newDiff = (ratio * (this.rightPos - this.leftPos)) - this.handleWidth / 2;
        this.handleLeft = newDiff;
        this.handleLeftCss = this.handleLeft + 'px';
    }

    @Input()
    set value(newValue: number) {
        if (newValue == null) {
            return;
        }

        if (newValue > this.maxValue) {
            newValue = this.maxValue;
        } else if (newValue < this.minValue) {
            newValue = this.minValue;
        }

        // Do not assume both sliders are exactly aligned
        const handleToLeftDiff = newValue / this.conversionFactor;
        this.updateHandleHorizontalOffset(handleToLeftDiff);
    }

    // TODO probably doesn't need to be a setter
    @Input()
    set verticalOffset(diff: number) {
        this.handleTopCss = this.initialHandleTop + 'px';
        this.setupSliderView();
    }

    updateHandleHorizontalOffset(diffInPixels: number) {
        this.handleLeft = diffInPixels;
        this.handleLeftCss = this.handleLeft - (this.handleWidth / 2) + 'px';
    }

    setupSliderView() {
        this.leftPos = this.elRef.nativeElement.getBoundingClientRect().left;
        this.rightPos = this.elRef.nativeElement.getBoundingClientRect().right;
        this.conversionFactor = ((this.maxValue - this.minValue) / (this.rightPos - this.leftPos));
    }
}
// TODO remove setTimeout where possible
