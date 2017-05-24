import { browser, element, by } from 'protractor';

export class PrecisionSlidersPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  findHandleTop() {
    return element(by.css('.slider-handle')).getLocation().then((location) => {
      return location.y;
    });
  }

  findTrackTop() {
    return element(by.css('.slider-bar')).getLocation().then((location) => {
      return location.y;
    });
  }

  findHandleHeight() {
    return element(by.css('.slider-handle')).getSize().then((size) => {
      return size.height;
    });
  }

  findTrackHeight() {
    return element(by.css('.slider-bar')).getSize().then((size) => {
      return size.height;
    });
  }
}
