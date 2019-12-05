/* eslint-disable camelcase */
import { getCookie } from "conf/cookies";

export function googleTrackAllow() {
  // Report "Allow" event to consumers Google Analytics Instance.
  const { gtag = () => {} } = window;
  gtag("event", "Allow");
}

export function googleFireConversion() {
  const { goog_report_conversion = () => {} } = window;
  try {
    // If 'firedConversionPixels' cookie exists, conversion have been fired, don't refire.
    // Fire off Google's conversion pixel.
    if (getCookie("firedConversion")) return;
    goog_report_conversion();
  } catch (e) {
    throw new Error(e);
  }
}
