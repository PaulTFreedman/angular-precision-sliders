import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SliderComponent } from '../slider/slider.component';
import { ResponsiveSliderComponent } from './responsive-slider.component';
import { MouseEventOutsideDirective } from '../../directives/mouse-outside.directive';
import { BackgroundColourDirective } from '../../directives/background-colour.directive';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set initial value to min value if not defined', () => {
      const minValue = 0;

      component.minValue = minValue;
      component.maxValue = 20;

      component.ngOnInit();

      expect(component.initialValue).toEqual(minValue);
  });

  it('should set to min value if out-of-range initial value supplied', () => {
      const minValue = 0;

      component.minValue = minValue;
      component.maxValue = 20;
      component.initialValue = -10;

      component.ngOnInit();

      expect(component.initialValue).toEqual(minValue);
  });
});
