import { prependEventNameSpace } from "conf/utils";

// Prompt Event Consts.
export const PROMPT = prependEventNameSpace("prompt:", {
  NOTIFICATION_PREF_PREVIOUSLY_SET: "notification:pref:previously_set",
  NOTIFICATION_PREF_GRANTED: "notification:pref:granted",
  NOTIFICATION_PREF_DENIED: "notification:pref:denied",
  NOTIFICATION_PREF_UPDATED: "notifications:pref:updated",
  READY: "app:ready",
  SHOW: "show",
  CLOSE: "close",
  USER_REGISTERED: "user:registered"
});

// Token Events
export const TOKEN = prependEventNameSpace("token:", {
  SUBSCRIBING: "subscribing",
  SUBSCRIBED: "subscribed"
});

// Service Worker Events
export const SERVICE_WORKER = prependEventNameSpace("service_worker:", {
  INSTALLING: "installing",
  INSTALLED: "installed"
});

// Unsubscribe Event Consts.
export const UNSUBSCRIBE = prependEventNameSpace("unsubscribe:", {
  READY: "app:ready",
  USER_UNREGISTERED: "user:unregistered"
});

// Notify Event Consts.
// Note: need to use legacy namespace for these events.
export const NOTIFY = prependEventNameSpace("notify_", {
  ALLOW: "allow",
  CLOSE: "close",
  ERROR_PROMPT: "error_prompt",
  ERROR_PROMPT_SENDTOKENAPI: "error_prompt_sendtokentoapi",
  ONMESSAGE: "onmessage",
  PAGEVIEW: "pageview",
  PROMPT: "prompt",
  RECEIVED: "received",
  RECEIVED_ISSUE: "received_issue",
  REJECT: "reject",
  RETURNING_USER: "returning_user",
  TOKEN_EXISTS: "token_exists",
  TYP_CLICK: "typ_click",
  TYP_SHOW: "typ_show",
  UNSUBSCRIBE: "unsubscribe",
  UNSUBSCRIBE_VIEW: "unsubscribe_view"
});

// Default Events
// Note: need to use legacy namespace for these events.
export const DEFAULT = prependEventNameSpace("default_", {
  PROMPT_GET_CONTENTS: "prompt_getcontents",
  PROMPT_REQUEST_NOTIFY: "prompt_request_notify",
  PROMPT_SEND_FETCH: "prompt_sendfetch",
  PROMPT_SEND_ERROR_FETCH: "prompt_senderrorfetch",
  PROMPT_SEND_FETCH_ADVANCED: "prompt_sendfetchadvanced"
});

// Non-Event Consts.
export const CONSTS = {
  DEFAULT: "default",
  DENIED: "denied",
  GRANTED: "granted",
  ANALYTICS_SEND_BEACON: "analytics:send:beacon"
};

export default {
  CONSTS,
  NOTIFY,
  PROMPT,
  UNSUBSCRIBE
};
