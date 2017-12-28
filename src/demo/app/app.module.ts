import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SlidersModule } from '../../lib/src/sliders.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SlidersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
