import constCapsule, {
  NOTIFY,
  PROMPT,
  DEFAULT,
  CONSTS
} from "conf/constCapsule.js";
import { supportsNotifications, getNotificationPref } from "conf/utils";
import { requestPermission } from "conf/firebase";

export async function prompt({
  events: {
  onPromptShow = () => {},
  onPromptClose = () => {},
  onPromptAllow = () => {},
  onPromptDeny = () => {}
  } = {}
}) {
  // Check browser support for notifications. If it doesn't support
  // back out.
  if (!supportsNotifications()) {
    return console.error("This browser does not support desktop notifications");
  }
  onPromptShow();
  try {
    // Ask the user for permission
    // Allow will hit onPromptAllow
    await requestPermission();
    onPromptAllow();
  } catch (error) {
    // Deny will hit onPromptAllow
    onPromptDeny();
  }
  onPromptClose();
}
