import { serialize, getUrls } from "conf/urls";
import { logAnalytics } from "conf/utils";

// Pollyfills
import "navigator.sendbeacon";

/**
 * Class representing all our Analytics tracking.
 */
export default class Analtyics {
  /**
   * Create the Analytics instance, and get and set the userClass required for all tracking.
   */
  constructor({ schema = undefined } = {}) {
    if (!schema) throw new Error("Analytics schema must be defined");
    this.INTERNAL = { schema };
  }

  /**
   * Sends formatted tracking data to our Analytics endpoint using the navigator.sendBeacon method,
   * read more about the benefites of sendBeacon here:
   * https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon
   * @param {Object} delta - The Analytics data object containing the parameters need for send beacon.
   * @param {string} delta.url - The formatted url with all the analytics data needed to track and event.
   */
  sendBeacon({ url = undefined }) {
    if (!url) throw new Error("Missing url in track method");
    window.navigator.sendBeacon(url);
  }

  /**
   * Converts the passed parameters into a url friendly string to pass to the Analytics endpoint.
   * @param {string} eventName - Name of the event.
   * @param {Object} eventParams - The paramters converted into a url friendly string for tracking.
   */
  track = event => {
    if (!event) throw new Error("event param missing from track()");

    const queryString = serialize({
      event,
      ...this.INTERNAL.schema
    });

    const url = `${getUrls().TRACK}?${queryString}`;
    if (logAnalytics()) console.log("Analytics:", { eventName: event, url });
    this.sendBeacon({ url });
  };
}
