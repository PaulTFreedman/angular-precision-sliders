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

    private value: number;// TODO unclear if this is needed
    private initialFocusMarginTop: string;
    private focusMarginTopCss: string;
    private isDragging: boolean;
    private mouseDownY: number;

    @Output()
    private valueChanged: EventEmitter<number> = new EventEmitter();
    
    constructor() { }

    ngOnInit() {
        this.initialFocusMarginTop = "-12px";
        this.focusMarginTopCss = this.initialFocusMarginTop;
    }

    onMouseOutside(event: MouseEvent) {
        if (event.type === "mousemove") {
            this.onMouseMove(event);
        }
    }

    onPrecisionValueChange(value: number) {
        this.value = value;
        this.valueChanged.emit(value);
        console.log('Precision val changed');

        //TODO update base slider value
    }

    private onMouseMove(event: MouseEvent): void {
        if (this.isDragging) {
            //TODO calculate top of precision slider
            var dragDistance = event.clientY - this.mouseDownY;
            //console.log(dragDistance);
        }
    }

    onFocusMouseDown(event: MouseEvent): void {
        this.isDragging = true;
        this.mouseDownY = event.clientY;
    }
}
//NOTE: If you do position: absolute you'll likely want width: 100%
//TODO when we switch display to none we want to compensate for the width
//Put the mouse move directive on here then keep track of y-offsets
//Precision slider is the one that starts off transparent

//TODO base slider should be a total dummy - user cannot interact at all
// Should just update based on focus slider

//TODO split out basic logic into dummy slider and responsive slider

//TODO need to set flex-grow in code using some amount out of the total