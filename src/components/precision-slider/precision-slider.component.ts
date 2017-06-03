import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'precision-slider',
    templateUrl: 'precision-slider.component.html',
    styleUrls: ['precision-slider.component.css']
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

    private value: number;// TODO unclear if this is needed

    @Output()
    private valueChanged: EventEmitter<number> = new EventEmitter();
    
    constructor() { }

    ngOnInit() { }

    onSliderValueChange(value: number) {
        this.value = value;
        this.valueChanged.emit(value);
    }
}