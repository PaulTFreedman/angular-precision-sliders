import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ResponsiveSliderComponent } from '../responsive-slider/responsive-slider.component';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'aps-precision-slider',
    templateUrl: 'precision-slider.component.html',
    styleUrls: ['precision-slider.component.less']
})
export class PrecisionSliderComponent implements OnInit, AfterViewInit {
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
    focusOffsetThreshold: number;
    @Input()
    focusRate: number;
    @Input()
    focusMinRange: number;
    @Input()
    selectableColour: string;
    @Input()
    nonSelectableColour: string;
    @Input()
    handleFill: string;

    @ViewChild('baseSlider', {read: ElementRef}) baseSlider: ElementRef;
    @ViewChild('responsiveSlider') responsiveSlider: ResponsiveSliderComponent;

    value: number;
    initialFocusMarginTop: number;
    focusMarginTopCss: string;
    isDragging: boolean;
    mouseDownY: number;
    dragDistance: number;
    reponsiveSliderOpacity: string;
    width: string;

    baseBottomFlexGrow: number;
    baseMiddleFlexGrow: number;
    baseTopFlexGrow: number;

    precisionBottomFlexGrow: number;
    precisionMiddleFlexGrow: number;
    precisionTopFlexGrow: number;

    precisionMinValue: number;
    precisionMaxValue: number;
    precisionRangeCentre: number;

    mouseMoveListener: () => void;
    mouseUpListener: () => void;
    touchMoveListener: () => void;
    touchEndListener: () => void;

    @Output()
    private valueChanged: EventEmitter<number> = new EventEmitter();

    constructor(private renderer2: Renderer2) { }

    ngOnInit() {
        this.dragDistance = 0;
        this.reponsiveSliderOpacity = '0.0';

        this.resetBaseSlider();
        this.resetPrecisionSlider();
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.width = this.baseSlider.nativeElement.offsetWidth + 'px';

            setTimeout(() => {
                // Need to render focus slider before using its width to set conversion factor
                this.initialFocusMarginTop = -this.baseSlider.nativeElement.offsetHeight;
                this.focusMarginTopCss = this.initialFocusMarginTop + 'px';
                this.responsiveSlider.setupSliderView();
            });
        });
    }

    onPrecisionValueChange(value: number) {
        this.value = value;

        if (this.value > this.maxValue) {
            this.value = this.maxValue;
        } else if (this.value < this.minValue) {
            this.value = this.minValue;
        }

        this.valueChanged.emit(this.value);
    }

    private onMouseMove(event: MouseEvent): void {
        this.doDrag(event.clientY);
    }

    private onTouchMove(event: TouchEvent): void {
        this.doDrag(event.touches[0].clientY);
    }

    private doDrag(yPos: number) {
        if (this.isDragging) {
            const dragDistance = yPos - this.mouseDownY;

            if (dragDistance > this.focusOffsetThreshold) {
                this.reponsiveSliderOpacity = '0.5';
                this.dragDistance = dragDistance;
                this.focusMarginTopCss = this.initialFocusMarginTop + this.dragDistance + 'px';

                if (!this.precisionRangeCentre) {
                    this.precisionRangeCentre = this.value;
                }

                this.setRange(dragDistance, this.precisionRangeCentre);
            }
        }
    }

    private setRange(dragDistance: number, sliderValue: number): void {
        const fullRange = this.maxValue - this.minValue;

        let range = fullRange - (this.focusRate * dragDistance);
        if (range < (fullRange * this.focusMinRange)) {
            range = fullRange * this.focusMinRange;
        }

        const left = sliderValue - (0.5 * range);
        const right = sliderValue + (0.5 * range);

        this.precisionMinValue = left;
        this.precisionMaxValue = right;

        const leftInvalidSize = this.minValue - left;
        const rightInvalidSize = right - this.maxValue;

        if (leftInvalidSize > 0) {
            this.precisionBottomFlexGrow = leftInvalidSize;
            this.precisionMiddleFlexGrow = Math.min(right, this.maxValue) - Math.max(left , this.minValue);
            this.precisionTopFlexGrow = 0;
        }

        if (rightInvalidSize > 0) {
            this.precisionBottomFlexGrow = 0;
            this.precisionMiddleFlexGrow = Math.min(right, this.maxValue) - Math.max(left , this.minValue);
            this.precisionTopFlexGrow = rightInvalidSize;
        }

        this.baseBottomFlexGrow = Math.max(left , this.minValue);
        this.baseMiddleFlexGrow = Math.min(right, this.maxValue) - Math.max(left , this.minValue);
        this.baseTopFlexGrow = this.maxValue - Math.min(right, this.maxValue);
    }

    private onMouseUp(): void {
        if (this.mouseMoveListener) {
            this.mouseMoveListener();
        }

        if (this.mouseUpListener) {
            this.mouseUpListener();
        }

        this.isDragging = false;
        this.reponsiveSliderOpacity = '0.0';
        this.dragDistance = 0;
        this.focusMarginTopCss = this.initialFocusMarginTop + 'px';
        this.resetBaseSlider();
        this.resetPrecisionSlider();
    }

    onFocusMouseDown(event: MouseEvent): void {
        this.isDragging = true;
        this.mouseDownY = event.clientY;

        this.mouseMoveListener = this.renderer2.listen('document', 'mousemove', (evt: MouseEvent) => {
            this.onMouseMove(evt);
        });

        this.mouseUpListener = this.renderer2.listen('document', 'mouseup', (evt: MouseEvent) => {
            this.onMouseUp();
        });
    }

    onFocusTouch(event: TouchEvent): void {
        this.isDragging = true;
        this.mouseDownY = event.touches[0].clientY;

        this.touchMoveListener = this.renderer2.listen('document', 'touchmove', (evt: TouchEvent) => {
            this.onTouchMove(evt);
        });

        this.touchEndListener = this.renderer2.listen('document', 'touchend', (evt: TouchEvent) => {
            this.onMouseUp();
        });
    }

    resetBaseSlider(): void {
        this.baseBottomFlexGrow = 0;
        this.baseMiddleFlexGrow = 1;
        this.baseTopFlexGrow = 0;
        this.precisionMinValue = this.minValue;
        this.precisionMaxValue = this.maxValue;
    }

    resetPrecisionSlider(): void {
        this.precisionBottomFlexGrow = 0;
        this.precisionMiddleFlexGrow = 1;
        this.precisionTopFlexGrow = 0;
        this.precisionRangeCentre = 0;
        this.precisionMinValue = this.minValue;
        this.precisionMaxValue = this.maxValue;

        setTimeout(() => {
            // Move focus slider's handle back in line with base slider
            this.responsiveSlider.value = this.value;
        });
    }
}
