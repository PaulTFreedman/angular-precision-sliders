import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  public basicSliderVal: number;
  public precisionSliderVal: number;
  public dummySliderVal: number = 0;

  title = 'Angular Precision Sliders!';

  onBasicValueChange(value: number) {
    this.basicSliderVal = Math.round(value);
  }

  onPrecisionValueChange(value: number) {
    this.precisionSliderVal = Math.round(value);
  }
}
