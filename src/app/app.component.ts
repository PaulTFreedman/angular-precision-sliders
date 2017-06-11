import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'app works!';

  public sliderVal1: number;

  onSlider1ValueChange(value: number) {
    this.sliderVal1 = Math.round(value);    
  }
}
