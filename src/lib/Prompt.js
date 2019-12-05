import EventEmitter from "lib/EventEmitter";
import { PROMPT, CONSTS } from "conf/constCapsule.js";
import { supportsNotifications, getNotificationPref } from "conf/utils";

export default class Prompt extends EventEmitter {
  constructor({ Firebase = undefined }) {
    super();
    // Check browser support for notifications. If it doesn't support
    // back out.
    if (!supportsNotifications()) {
      return console.error(
        "This browser does not support desktop notifications"
      );
    }

    if (!Firebase) {
      throw new Error("Firebase instance is required for Prompt");
    }

    this.INTERNAL = {
      Firebase
    };
  }

  requestPermission = async () => {
    // 1. Ensure we can ask for permission.
    if (this.isPrefSet()) return;
    try {
      // 2. Request Notification Permission (Show Prompt).
      await this.permissionRequest();
      // 3a. User Allowed Notifications.
      this.allowNotifications();
    } catch (error) {
      // 3b. User Denied Notifications.
      this.denyNotifications();
    }
    // 4. Prompt Closes
    this.closePrompt();
  };

  isPrefSet() {
    if (getNotificationPref() === CONSTS.DEFAULT) return false;
    // In the case we go to show prompt and the pref
    // has already been set emit an event to the consumer.
    this.emit(PROMPT.NOTIFICATION_PREF_PREVIOUSLY_SET, {
      notificationPref: getNotificationPref()
    });
    return true;
  }

  permissionRequest() {
    this.emit(PROMPT.SHOW);
    return this.INTERNAL.Firebase.requestPermission();
  }

  closePrompt() {
    this.emit(PROMPT.CLOSE);
  }

  allowNotifications() {
    this.emit(PROMPT.NOTIFICATION_PREF_GRANTED);
  }

  denyNotifications() {
    this.emit(PROMPT.NOTIFICATION_PREF_DENIED);
  }
}
