import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[apsBackgroundColour]'
})
export class BackgroundColourDirective implements AfterViewInit {
    @Input()
    public colour: string;

    constructor(private elRef: ElementRef) { }

    ngAfterViewInit() {
        this.elRef.nativeElement.style.background = this.colour;
    }
}
