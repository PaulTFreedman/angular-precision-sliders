# angular-precision-sliders

An Angular component library featuring several sliders including a precision slider that offers increased accuracy over a standard slider when the data range is large.

## Demo
To see these components in action go to https://paultfreedman.github.io/angular-precision-sliders/

## Installation
Run the following command from your project directory:
```shell
npm install angular-precision-sliders
```
Then import the SlidersModule:
```js
import { SlidersModule } from 'angular-precision-sliders';
```
and add it to the `imports` array of your module:
```js
@NgModule({
  declarations: [AppComponent, ...],
  imports: [SlidersModule,...],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Components
### Precision Slider

Allows you to reduce the range of the slider by dragging vertically.

#### Example
```html
<aps-precision-slider class="slider precision-slider" [minValue]="0" [maxValue]="2500" [initialValue]="0" [handleWidth]="30" [focusOffsetThreshold]="36" [focusRate]="10" [focusMinRange]="0.05"
        (valueChanged)="onPrecisionValueChange($event)" [selectableColour]="'orange'" [nonSelectableColour]="'gainsboro'" [handleFill]="'black'"></aps-precision-slider>
```

### Responsive Slider

A standard slider that responds to user input.

#### Example
```html
<aps-responsive-slider class="slider basic-slider" [minValue]="0" [maxValue]="2500" [initialValue]="0" [handleWidth]="30" [bottomColour]="'green'"
        [middleColour]="'green'" [topColour]="'green'" (valueChanged)="onBasicValueChange($event)"></aps-responsive-slider>
```

### Slider

Does not respond directly to user input.

#### Example
```html
<aps-slider class="slider" [minValue]="0" [maxValue]="2500" [initialValue]="0" [value]="dummySliderVal" [handleWidth]="30" [bottomColour]="'red'"
        [middleColour]="'red'" [topColour]="'red'"></aps-slider>
```
