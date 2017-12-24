import { NgModule } from '@angular/core';
import { SliderComponent } from '../../lib/src/components/slider/slider.component';
import { ResponsiveSliderComponent } from '../../lib/src/components/responsive-slider/responsive-slider.component';
import { PrecisionSliderComponent } from '../../lib/src/components/precision-slider/precision-slider.component';
import { MouseEventOutsideDirective } from '../../directives/mouse-outside.directive';
import { BackgroundColourDirective } from '../../directives/background-colour.directive';

@NgModule({
    declarations: [
      SliderComponent,
      ResponsiveSliderComponent,
      PrecisionSliderComponent,
      MouseEventOutsideDirective,
      BackgroundColourDirective
    ],
    imports: [],
    providers: [],
    exports: [
      SliderComponent,
      ResponsiveSliderComponent,
      PrecisionSliderComponent
    ]
  })
  export class SlidersModule { }