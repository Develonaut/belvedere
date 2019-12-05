import { logEventEmitter } from "conf/utils";

export default class EventEmitter {
  constructor() {
    this._events = {};
  }

  getEventListByName(eventName) {
    if (typeof this._events[eventName] === "undefined") {
      this._events[eventName] = new Set();
    }
    return this._events[eventName];
  }

  on = (eventName, fn) => {
    this.getEventListByName(eventName).add(fn);
  };

  once = (eventName, fn) => {
    const self = this;
    /* eslint-disable-next-line */
    const onceFn = function(...args) {
      self.removeListener(eventName, onceFn);
      fn.apply(self, args);
    };
    this.on(eventName, onceFn);
  };

  emit = (eventName, ...args) => {
    if (logEventEmitter()) console.log("EventEmitter:", { eventName, args });
    this.getEventListByName(eventName).forEach(fn => {
      fn.apply(this, args);
    });
  };

  removeListener = (eventName, fn) => {
    this.getEventListByName(eventName).delete(fn);
  };
}
