import { googleTrackAllow, googleFireConversion } from "conf/google";
import { setCookie } from "conf/cookies";

export function thirdPartyConversions() {
  // Fire off google Conversion event, and
  // attach conversion pixesl.
  googleTrackAllow();
  googleFireConversion();
  // Set the 'firedConversionPixels' cookie for later checks.
  setCookie({
    key: "firedConversion",
    value: "true",
    options: { expires: 36500 }
  });
}
