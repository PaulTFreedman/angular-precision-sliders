import { Directive, HostListener, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
    selector: '[mouseOutside]'
})
export class MouseEventOutsideDirective {
    constructor(private elRef: ElementRef) {

    }

    @Output()
    public mouseOutside = new EventEmitter();

    @HostListener('document:mousemove', ['$event'])
    public onMouseMove(event: any) {
        this.mouseOutside.emit(event);
    }

    @HostListener('document:mouseup', ['$event'])
    public onmouseup(event: any) {
        this.mouseOutside.emit(event);
    }
}