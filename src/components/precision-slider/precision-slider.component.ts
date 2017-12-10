import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ResponsiveSliderComponent } from '../responsive-slider/responsive-slider.component';

@Component({
    selector: 'precision-slider',
    templateUrl: 'precision-slider.component.html',
    styleUrls: ['precision-slider.component.less']
})
export class PrecisionSliderComponent implements OnInit {
    @Input()
    minValue: number;
    @Input()
    maxValue: number;
    @Input()
    initialValue: number;
    @Input()
    handleWidth: number;
    @Input()
    selectableColour: string;
    @Input()
    nonSelectableColour: string;
    @Input()
    handleFill: string;

    @ViewChild('baseSlider', {read: ElementRef}) baseSlider: ElementRef;
    @ViewChild('responsiveSlider') responsiveSlider: ResponsiveSliderComponent;

    private value: number;
    private initialFocusMarginTop: number;
    private focusMarginTopCss: string;
    private isDragging: boolean;
    private mouseDownY: number;
    private dragDistance: number;
    private reponsiveSliderOpacity: string;
    private width: string;
    
    private baseBottomFlexGrow: number;
    private baseMiddleFlexGrow: number;
    private baseTopFlexGrow: number;

    private precisionBottomFlexGrow: number;
    private precisionMiddleFlexGrow: number;
    private precisionTopFlexGrow: number;

    private precisionMinValue: number;
    private precisionMaxValue: number;
    private precisionRangeCentre: number;

    @Output()
    private valueChanged: EventEmitter<number> = new EventEmitter();
    
    constructor() { }

    ngOnInit() {
        this.dragDistance = 0;
        this.reponsiveSliderOpacity = "0.0";

        this.resetBaseSlider();
        this.resetPrecisionSlider();
    }

    ngAfterViewInit() {
        setTimeout(() => {            
            this.width = this.baseSlider.nativeElement.offsetWidth + "px";
            
            setTimeout(() => {
                // Need to render focus slider before using its width to set conversion factor
                this.initialFocusMarginTop = -this.baseSlider.nativeElement.offsetHeight;        
                this.focusMarginTopCss = this.initialFocusMarginTop + "px";
                this.responsiveSlider.setupSliderView();
            });
        });
    }

    onMouseOutside(event: MouseEvent) {
        if (event.type === "mousemove") {
            this.onMouseMove(event);
        } else if (event.type === "mouseup") {
            this.onMouseUp();
        }
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
        if (this.isDragging) {
            var dragDistance = event.clientY - this.mouseDownY;

            if (dragDistance > 36) {
                this.reponsiveSliderOpacity = "0.5";
                this.dragDistance = dragDistance;
                this.focusMarginTopCss = this.initialFocusMarginTop + this.dragDistance + "px";

                if (!this.precisionRangeCentre) {
                    this.precisionRangeCentre = this.value;
                }
                
                this.setRange(dragDistance, this.precisionRangeCentre);
            }
        }
    }

    private setRange(dragDistance: number, sliderValue: number): void {
        var fullRange = this.maxValue - this.minValue;
        var focusRate = 8.0;

        //TODO probably better to make this logarithmic
        var range = fullRange - (focusRate * dragDistance);
        var left = sliderValue - (0.5 * range);
        var right = sliderValue + (0.5 * range);

        this.precisionMinValue = left;
        this.precisionMaxValue = right;

        var leftInvalidSize = this.minValue - left;
        var rightInvalidSize = right - this.maxValue;

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
        this.isDragging = false;
        this.reponsiveSliderOpacity = "0.5";
        this.dragDistance = 0;
        this.focusMarginTopCss = this.initialFocusMarginTop + "px";
        this.resetBaseSlider();
        this.resetPrecisionSlider();

        //TODO make sure the focus slider lines up exactly with the base slider - should have same value and min/max
    }

    onFocusMouseDown(event: MouseEvent): void {
        this.isDragging = true;
        this.mouseDownY = event.clientY;
    }

    resetBaseSlider(): void {
        this.baseBottomFlexGrow = 0;
        this.baseMiddleFlexGrow = 1;
        this.baseTopFlexGrow = 0;
        this.precisionMinValue = this.minValue;
        this.precisionMaxValue = this.maxValue;
        this.precisionRangeCentre = undefined;
    }

    resetPrecisionSlider(): void {
        this.precisionBottomFlexGrow = 0;
        this.precisionMiddleFlexGrow = 1;
        this.precisionTopFlexGrow = 0;
        this.precisionMinValue = this.minValue;
        this.precisionMaxValue = this.maxValue;
    }
}