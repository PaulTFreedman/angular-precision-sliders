import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[backgroundColour]'
})
export class BackgroundColourDirective {
    @Input()
    colour: string;
    
    constructor(private elRef: ElementRef) { }

    ngAfterViewInit() {
        this.elRef.nativeElement.style.background = this.colour;
    }
}