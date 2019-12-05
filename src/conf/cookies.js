import { get, set, erase, all } from "browser-cookies";

/**
 *
 *
 * @param {string} k
 * @returns
 */
export function getCookie(key) {
  const cookie = get(key);
  return cookie === "undefined" ? undefined : cookie;
}

/**
 *
 *
 * @param {*} { key, value, options = {} }
 * @returns
 */
export function setCookie({ key, value, options = {} }) {
  if (!key || !value) {
    console.error("Missing key/value");
    return;
  }
  set(key, value, options);
  return get(key);
}

/**
 *
 *
 * @export
 * @param {*} key
 */
export function eraseCookie(key) {
  erase(key);
}

/**
 *
 *
 * @export
 * @param {*} key
 */
export function eraseAllCookies() {
  const cookies = all();
  Object.keys(cookies).forEach(cookie => eraseCookie(cookie));
}
