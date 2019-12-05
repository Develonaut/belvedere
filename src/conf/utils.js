export function isDev() {
  return process.env.NODE_ENV === "development";
}

export function clearCookies() {
  return isDev() && process.env.CLEAR_COOKIES === "true";
}

export function logEventEmitter() {
  return isDev() && process.env.LOG_EVENTS === "true";
}

export function logAnalytics() {
  return isDev() && process.env.LOG_ANALYTICS === "true";
}

export function appendQueryParams() {
  return isDev() && !!process.env.QUERY_PARAMS;
}

/**
 *
 *
 * @export
 * @returns
 */
export function getTodaysDate() {
  return new Date()
    .toISOString()
    .split("T")[0]
    .toString();
}

/**
 *
 *
 * @export
 * @returns
 */
export function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 *
 *
 * @export
 * @returns
 */
export function supportsNotifications() {
  // Check browser support for notifications.
  if (!"Notification" in window) return false;
  return true;
}

/**
 *
 *
 * @export
 * @returns
 */
export function getNotificationPref() {
  const { Notification: { permission = "default" } = {} } = window;
  return permission;
}

/**
 *
 *
 * @export
 * @param {string} [string=""]
 * @param {*} [eventNames={}]
 * @returns
 */
export function prependEventNameSpace(string = "", eventNames = {}) {
  return Object.keys(eventNames).reduce((events, key) => {
    return {
      ...events,
      [key]: `${string}${eventNames[key]}`
    };
  }, {});
}
