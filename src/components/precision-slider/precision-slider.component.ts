import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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

    private value: number;
    private initialFocusMarginTop: number;
    private focusMarginTopCss: string;
    private isDragging: boolean;
    private mouseDownY: number;
    private dragDistance: number;
    private reponsiveSliderOpacity: string;

    @Output()
    private valueChanged: EventEmitter<number> = new EventEmitter();
    
    constructor() { }

    ngOnInit() {
        this.initialFocusMarginTop = -12;
        this.focusMarginTopCss = this.initialFocusMarginTop + "px";
        this.dragDistance = 0;
        this.reponsiveSliderOpacity = "0.0";
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
        this.valueChanged.emit(value);
    }

    private onMouseMove(event: MouseEvent): void {
        if (this.isDragging) {
            var dragDistance = event.clientY - this.mouseDownY;

            if (dragDistance > 12) { //Slider height
                this.reponsiveSliderOpacity = "0.5";
                this.dragDistance = dragDistance;
                this.focusMarginTopCss = this.initialFocusMarginTop + this.dragDistance + "px";
            }
        }
    }

    private onMouseUp(): void {
        this.isDragging = false;
        this.reponsiveSliderOpacity = "0.0";
        this.dragDistance = 0;
        this.focusMarginTopCss = this.initialFocusMarginTop + "px";
    }

    onFocusMouseDown(event: MouseEvent): void {
        this.isDragging = true;
        this.mouseDownY = event.clientY;
    }
}
//NOTE: If you do position: absolute you'll likely want width: 100%
//TODO when we switch display to none we want to compensate for the width
//TODO need to set flex-grow in code using some amount out of the total