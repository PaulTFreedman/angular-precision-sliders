import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { SliderComponent } from '../components/slider/slider.component';
import { PrecisionSliderComponent } from '../components/precision-slider/precision-slider.component';
import { MouseEventOutsideDirective } from '../directives/mouse-outside.directive';
import { BackgroundColourDirective } from '../directives/background-colour.directive';

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    PrecisionSliderComponent,
    MouseEventOutsideDirective,
    BackgroundColourDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
