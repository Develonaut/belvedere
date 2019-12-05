import EventEmitter from "lib/EventEmitter";
import { SERVICE_WORKER } from "conf/constCapsule";
import { serialize, getUrls } from "conf/urls";

export default class ServiceWorkerRegistrar extends EventEmitter {
  constructor({ schema = undefined, Firebase = undefined }) {
    super();
    if (!schema)
      throw new Error("User's schema is required in ServiceWorkerRegistrar");
    if (!Firebase)
      throw new Error(
        "Firebase instance is required in ServiceWorkerRegistrar"
      );
    // Assign to INTERNAL to signify that
    // this data should only be used Internally.
    this.INTERNAL = {
      schema,
      Firebase
    };
  }

  register = async () => {
    // Register the service worker, and tell Firebase to use it.
    const serviceWorker = await this._register();
    await this.INTERNAL.Firebase.useServiceWorker(serviceWorker);
    this.emit(SERVICE_WORKER.INSTALLED);
  };

  async _register() {
    try {
      this.emit(SERVICE_WORKER.INSTALLING);
      return await navigator.serviceWorker.register(
        `${getUrls().SW_BASE}?${serialize(this.INTERNAL.schema)}`
      );
    } catch (error) {
      throw new Error(error);
    }
  }
}
