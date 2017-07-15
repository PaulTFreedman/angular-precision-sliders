import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'Angular Precision Sliders!';

  public basicSliderVal: number;
  public precisionSliderVal: number;

  onBasicValueChange(value: number) {
    this.basicSliderVal = Math.round(value);
  }

  onPrecisionValueChange(value: number) {
    this.precisionSliderVal = Math.round(value);
  }
}
