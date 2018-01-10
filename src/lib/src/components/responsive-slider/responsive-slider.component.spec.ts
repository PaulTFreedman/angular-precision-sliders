import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SliderComponent } from '../slider/slider.component';
import { ResponsiveSliderComponent } from './responsive-slider.component';
import { MouseEventOutsideDirective } from '../../directives/mouse-outside.directive';
import { BackgroundColourDirective } from '../../directives/background-colour.directive';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { By } from '@angular/platform-browser';

describe('PrecisionSliderComponent', () => {
  let component: ResponsiveSliderComponent;
  let fixture: ComponentFixture<ResponsiveSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SliderComponent,
        ResponsiveSliderComponent,
        MouseEventOutsideDirective,
        BackgroundColourDirective
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiveSliderComponent);
    component = fixture.componentInstance;
    component.handleWidth = 30;
  });

  it('should set initial value to min value if not defined', () => {
      const minValue = 0;

      component.minValue = minValue;
      component.maxValue = 20;

      fixture.detectChanges();

      expect(component.initialValue).toEqual(minValue);
  });

  it('should set to min value if initial value supplied is less than min', () => {
      component.minValue = 0;
      component.maxValue = 20;
      component.initialValue = -10;

      fixture.detectChanges();

      expect(component.initialValue).toEqual(component.minValue);
  });

  it('should set to max value if initial value supplied is more than max', () => {
    component.minValue = 0;
    component.maxValue = 20;
    component.initialValue = 30;

    fixture.detectChanges();

    expect(component.initialValue).toEqual(component.maxValue);
  });

  it('should move handle when slider track is clicked', (done: any) => {
    component.minValue = 0;
    component.maxValue = 20;
    component.initialValue = 0;
    component.bottomColour = 'blue';
    component.middleColour = 'blue';
    component.topColour = 'blue';

    fixture.detectChanges();

    setTimeout(() => {
      // Need to call again because handle offsets have changed since first call
      fixture.detectChanges();

      const sliderLeft = fixture.debugElement.nativeElement.offsetLeft;
      const handleEl = fixture.debugElement.query(By.css('.slider-handle'));
      const initialHandleOffset = handleEl.nativeElement.offsetLeft;

      // Imitate a click on the track
      const trackEl = fixture.debugElement.query(By.css('.slider-bar'));
      trackEl.triggerEventHandler('mousedown', {
        clientX: 200,
        clientY: 1
      });

      fixture.detectChanges();

      setTimeout(() => {
        const updatedHandleOffset = handleEl.nativeElement.offsetLeft;

        expect(updatedHandleOffset).toEqual(initialHandleOffset + 200 - sliderLeft);
        done();
      }, 100);
    }, 100);
  });
});
