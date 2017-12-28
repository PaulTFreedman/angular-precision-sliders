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
    public onMouseMove(event: any) {
        this.apsMouseOutside.emit(event);
    }

    @HostListener('document:mouseup', ['$event'])
    public onmouseup(event: any) {
        this.apsMouseOutside.emit(event);
    }
}
