import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderComponent } from './slider.component';

describe('PrecisionSliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
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

      expect(component.value).toEqual(minValue);
  });

  it('should set to min value if out-of-range initial value supplied', () => {
      const minValue = 0;

      component.minValue = minValue;
      component.maxValue = 20;
      component.initialValue = -10;

      component.ngOnInit();

      expect(component.value).toEqual(minValue);

    //   component.valueChanged.subscribe((v: number) => {
    //       expect(v).toEqual(minValue);
    //   });
  });

  it('should set max and initial to min value if max value less than min', () => {
      const minValue = 0;

      component.minValue = minValue;
      component.maxValue = -20;

      component.ngOnInit();

      expect(component.value).toEqual(minValue);
  });
});
