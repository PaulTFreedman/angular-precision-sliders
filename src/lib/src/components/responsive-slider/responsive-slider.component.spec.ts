import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SliderComponent } from '../slider/slider.component';
import { ResponsiveSliderComponent } from './responsive-slider.component';
import { BackgroundColourDirective } from '../../directives/background-colour.directive';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { By } from '@angular/platform-browser';

describe('ResponsiveSliderComponent', () => {
  let component: ResponsiveSliderComponent;
  let fixture: ComponentFixture<ResponsiveSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SliderComponent,
        ResponsiveSliderComponent,
        BackgroundColourDirective
      ]
    })
    .compileComponents();

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

  describe('when user interacts with slider', () => {

    beforeEach(() => {
      component.minValue = 0;
      component.maxValue = 20;
      component.initialValue = 0;
      component.bottomColour = 'blue';
      component.middleColour = 'blue';
      component.topColour = 'blue';
      component.trackHeight = 12;
    });

    describe('by clicking on track', () => {
      let initialHandleOffset: number;
      let updatedHandleOffset: number;
      let sliderLeft: number;

      async function clickOnSliderTrack(isTouch: boolean, eventOffset: number): Promise<void> {

        return new Promise<void>((resolve) => {

          fixture.detectChanges();

          setTimeout(() => {
            // Need to call again because handle offsets have changed since first call
            fixture.detectChanges();

            const handleEl = fixture.debugElement.query(By.css('.slider-handle'));
            sliderLeft = fixture.debugElement.nativeElement.offsetLeft;
            initialHandleOffset = handleEl.nativeElement.offsetLeft;

            // Imitate a click on the track
            const trackEl = fixture.debugElement.query(By.css('.slider-bar'));
            if (isTouch) {
              trackEl.triggerEventHandler('touchstart', {
                preventDefault: () => {},
                touches: [{
                  clientX: eventOffset,
                  clientY: 1
                }]
              });
            } else {
              trackEl.triggerEventHandler('mousedown', {
                clientX: eventOffset,
                clientY: 1
              });
            }

            fixture.detectChanges();

            setTimeout(() => {
              updatedHandleOffset = handleEl.nativeElement.offsetLeft;

              resolve();
            });
          });
        });
      }

      describe('with mouse', () => {
        const eventOffset = 200;

        it('should move handle', (done: any) => {
          clickOnSliderTrack(false, eventOffset).then(() => {
            expect(updatedHandleOffset).toEqual(initialHandleOffset + eventOffset - sliderLeft);
            done();
          });
        });

        it('should raise valueChanged event', (done: any) => {
          let valueChangedCount = 0;
          component.valueChanged.subscribe(() => valueChangedCount++ );

          clickOnSliderTrack(false, eventOffset).then(() => {
            expect(valueChangedCount).toEqual(2);
            done();
          });
        });
      });

      describe('with touch', () => {
        const eventOffset = 200;

        it('should move handle', (done: any) => {
          clickOnSliderTrack(true, eventOffset).then(() => {
            expect(updatedHandleOffset).toEqual(initialHandleOffset + eventOffset - sliderLeft);
            done();
          });
        });

        it('should raise valueChanged event', (done: any) => {
          let valueChangedCount = 0;
          component.valueChanged.subscribe(() => valueChangedCount++ );

          clickOnSliderTrack(true, eventOffset).then(() => {
            expect(valueChangedCount).toEqual(2);
            done();
          });
        });
      });
    });


    describe('by dragging the handle', () => {
      let initialHandleOffset: number;
      let updatedHandleOffset: number;
      let sliderLeft: number;

      async function dragSlider(isTouch: boolean, eventOffset: number): Promise<void> {

        return new Promise<void>((resolve) => {

          fixture.detectChanges();

          setTimeout(() => {
            // Need to call again because handle offsets have changed since first call
            fixture.detectChanges();

            const handleEl = fixture.debugElement.query(By.css('.slider-handle'));
            sliderLeft = fixture.debugElement.nativeElement.offsetLeft;
            initialHandleOffset = handleEl.nativeElement.offsetLeft;

            if (isTouch) {
              // TODO find way to trigger TouchMove
              // Imitate a click on the handle
              handleEl.triggerEventHandler('touchstart', {
                preventDefault: () => {},
                touches: [{
                  clientX: eventOffset
                }]
              });

              // Imitate drag
              const touch = Touch.prototype;

              document.dispatchEvent(new TouchEvent('touchmove', {
                touches: [touch]
              }));

              document.dispatchEvent(new TouchEvent('touchend'));
            } else {
              // Imitate a click on the handle
              handleEl.triggerEventHandler('mousedown', {
                offsetX: 1
              });

              // Imitate mouse move
              document.dispatchEvent(new MouseEvent('mousemove', {
                clientX: eventOffset + initialHandleOffset + sliderLeft + 1
              }));

              document.dispatchEvent(new MouseEvent('mouseup'));
            }

            fixture.detectChanges();

            setTimeout(() => {
              updatedHandleOffset = handleEl.nativeElement.offsetLeft;

              resolve();
            });
          });
        });
      }

      describe('with mouse', () => {
        const eventOffset = 200;

        it('should move handle', (done: any) => {
          dragSlider(false, eventOffset).then(() => {
            expect(updatedHandleOffset).toEqual(initialHandleOffset + eventOffset);
            done();
          });
        });

        it('should raise valueChanged event', (done: any) => {
          let valueChangedCount = 0;
          component.valueChanged.subscribe(() => valueChangedCount++ );

          dragSlider(false, eventOffset).then(() => {
            expect(valueChangedCount).toEqual(2);
            done();
          });
        });
      });

      describe('with touch', () => {
        const eventOffset = 200;

        it('should move handle');

        it('should raise valueChanged event');
      });
    });

  });
});
