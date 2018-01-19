import { SliderComponent } from '../slider/slider.component';
import { ResponsiveSliderComponent } from '../responsive-slider/responsive-slider.component';
import { PrecisionSliderComponent } from './precision-slider.component';
import { BackgroundColourDirective } from '../../directives/background-colour.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { By } from '@angular/platform-browser';

describe('PrecisionSliderComponent', () => {
    let comp: PrecisionSliderComponent;
    let fixture: ComponentFixture<PrecisionSliderComponent>;
    let focusSliderEl: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                SliderComponent,
                ResponsiveSliderComponent,
                PrecisionSliderComponent,
                BackgroundColourDirective
            ]
        });

        fixture = TestBed.createComponent(PrecisionSliderComponent);
        comp = fixture.componentInstance;

        comp.handleWidth = 30;

        focusSliderEl = fixture.debugElement.query(By.css('aps-responsive-slider'));
    });

    it('should not show focus slider initially', () => {
        fixture.detectChanges();
        const focusOpacity = focusSliderEl.nativeElement.style.opacity;

        expect(focusOpacity).toBe('0');
    });

    it('should show focus slider after user has dragged down');
});
