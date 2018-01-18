import { Directive, HostListener, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
    selector: '[apsMouseOutside]'
})
export class MouseEventOutsideDirective {
    constructor(private elRef: ElementRef) {

    }

    @Output()
    public apsMouseOutside = new EventEmitter();

    @HostListener('document:mousemove', ['$event'])
    @HostListener('document:mouseup', ['$event'])
    @HostListener('document:touchmove', ['$event'])
    @HostListener('document:touchend', ['$event'])
    public onMouseMove(event: any) {
        this.apsMouseOutside.emit(event);
    }
}
