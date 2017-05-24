import * as protractor from "protractor";
import { PrecisionSlidersPage } from '../../app.po';

describe('slider component', () => {
  let page: PrecisionSlidersPage;

  beforeEach(() => {
    page = new PrecisionSlidersPage();
  });

  // TODO maybe investigate why sizes are coming back as decimals
  it('should display handle in centre of slider track', () => {
    page.navigateTo();

    let handleTop: number;
    let handleHeight: number;
    let trackTop: number;
    let trackHeight: number;

    const handleTopFunc = page.findHandleTop().then((y) => { handleTop = y; });
    const handleHeightFunc = page.findHandleHeight().then((y) => { handleHeight = y; });
    const trackTopFunc = page.findTrackTop().then((y) => { trackTop = Math.round(y); });
    const trackHeightFunc = page.findTrackHeight().then((y) => { trackHeight = y; });

    protractor.promise.all([handleTopFunc, handleHeightFunc, trackTopFunc, trackHeightFunc]).then(() => {
        const expectedHandleTop = trackTop + (0.5 * trackHeight) - (0.5 * handleHeight);

        expect(handleTop).toBe(expectedHandleTop);
    });
  });
});
