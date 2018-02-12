import { SliderComponent } from '../slider/slider.component';
import { ResponsiveSliderComponent } from '../responsive-slider/responsive-slider.component';
import { PrecisionSliderComponent } from './precision-slider.component';
import { MouseEventOutsideDirective } from '../../directives/mouse-outside.directive';
import { BackgroundColourDirective } from '../../directives/background-colour.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { By } from '@angular/platform-browser';

describe('PrecisionSliderComponent', () => {
    let component: PrecisionSliderComponent;
    let fixture: ComponentFixture<PrecisionSliderComponent>;
    let focusSliderEl: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                SliderComponent,
                ResponsiveSliderComponent,
                PrecisionSliderComponent,
                MouseEventOutsideDirective,
                BackgroundColourDirective
            ]
        });

        fixture = TestBed.createComponent(PrecisionSliderComponent);
        component = fixture.componentInstance;
        component.handleWidth = 30;

        focusSliderEl = fixture.debugElement.query(By.css('aps-responsive-slider'));
    });

    it('should not show focus slider initially', () => {
        fixture.detectChanges();
        const focusOpacity = focusSliderEl.nativeElement.style.opacity;

        expect(focusOpacity).toBe('0');
    });

    fdescribe('when user interacts with slider', () => {
        beforeEach(() => {
            component.minValue = 0;
            component.maxValue = 20;
            component.initialValue = 0;
            component.trackHeight = 12;
            component.focusOffsetThreshold = 40;
            component.nonSelectableColour = 'green';
            component.selectableColour = 'red';
        });

        let initialFocusOffset: number;
        let updatedFocusOffset: number;

        async function dragFocusSlider(): Promise<void> {
            return new Promise<void>((resolve) => {
                fixture.detectChanges();

                setTimeout(() => {
                    // Need to call again because handle offsets have changed since first call
                    fixture.detectChanges();

                    setTimeout(() => {
                        // Need to call again to get focus slider positioned correctly
                        fixture.detectChanges();

                        console.log(document.body.getElementsByClassName('html-reporter')[0].getBoundingClientRect());
                        //console.log('document body top: ', bodyTop);
                        // fixture.debugElement.nativeElement.getBoundingClientRect());

                        initialFocusOffset = focusSliderEl.nativeElement.offsetTop;
                        console.log('initialFocusOffset: ', initialFocusOffset);

                        // console.log('It is ', initialFocusOffset + bodyTop, '?');

                        // Click focus slider
                        // TODO client space is whole test runner - we need to know where focus slider is
                        focusSliderEl.triggerEventHandler('mousedown', {
                            clientY: initialFocusOffset + 1
                        });

                        // Drag it down
                        document.dispatchEvent(new MouseEvent('mousemove', {
                            clientY: initialFocusOffset + 41
                        }));

                        fixture.detectChanges();

                        updatedFocusOffset = focusSliderEl.nativeElement.offsetTop;
                        resolve();
                    });
                });
            });
        }

        it('should show focus slider after user has dragged down', (done: any) => {
            dragFocusSlider().then(() => {
                document.addEventListener('mousedown', (evt: MouseEvent) => {
                    console.log(evt.clientY);
                });

                expect(focusSliderEl.nativeElement.style.opacity).toEqual('0.5');
                // expect(component).toBeTruthy();
                done();
            });
        });
    });
});
