import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './components/slider/slider.component';
import { ResponsiveSliderComponent } from './components/responsive-slider/responsive-slider.component';
import { PrecisionSliderComponent } from './components/precision-slider/precision-slider.component';
import { BackgroundColourDirective } from './directives/background-colour.directive';
import { MouseEventOutsideDirective } from './directives/mouse-outside.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SliderComponent,
    ResponsiveSliderComponent,
    PrecisionSliderComponent,
    BackgroundColourDirective,
    MouseEventOutsideDirective
  ],
  exports: [
    SliderComponent,
    ResponsiveSliderComponent,
    PrecisionSliderComponent
  ]
})
export class SlidersModule { }
