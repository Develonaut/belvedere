import Analtyics from "lib/Analytics";
import Prompt from "lib/Prompt";
import ServiceWorkerRegistrar from "lib/ServiceWorkerRegistrar";
import FirebaseInstance from "lib/Firebase";
import User from "lib/User";

import { NOTIFY, PROMPT } from "conf/constCapsule.js";
import { thirdPartyConversions } from "conf/thirdPartyConversions";
import TokenRegistrar from "./TokenRegistrar";

/**
 *
 *
 * @class Jalapeno is the JS wrapper for our
 * prompt and register user functionality.
 */
export default class Jalapeno {
  /**
   *Creates an instance of Jalapeno.
   * @memberof Jalapeno
   */
  constructor() {
    // Note: Initing our Libries and passing them along allows us to help
    // limit the mutation or variation of data throughout the onboarding flow.
    // Init User and generate a schema to pass down to other instances.
    const { schema } = new User();
    // Init Firebase and pass it to instances that require it.
    const Firebase = new FirebaseInstance();
    // Init Analytics with the generated User schema.
    this.analytics = new Analtyics({ schema });
    // Init ServiceWorkerRegistrar with the generated User schema, and Firebase instance.
    this.SWRegistrar = new ServiceWorkerRegistrar({ schema, Firebase });
    this.tokenRegistrar = new TokenRegistrar({ schema, Firebase });
    // Init Prompt, and attach event listeners to allow the onboarding flow to be initiated.
    this.prompt = new Prompt({ Firebase });
    this.attachPromptEventListeners();
  }

  /**
   *
   *
   * @memberof Jalapeno
   */
  attachPromptEventListeners() {
    this.prompt.on(PROMPT.SHOW, this.onPromptShow.bind(this));
    this.prompt.on(
      PROMPT.NOTIFICATION_PREF_GRANTED,
      this.onPromptAllow.bind(this)
    );
    this.prompt.on(
      PROMPT.NOTIFICATION_PREF_DENIED,
      this.onPromptDeny.bind(this)
    );
  }

  /**
   *
   *
   * @memberof Jalapeno
   */
  onPromptShow() {
    this.analytics.track(NOTIFY.PROMPT);
  }

  /**
   *
   *
   * @memberof Jalapeno
   */
  async onPromptAllow() {
    this.analytics.track(NOTIFY.ALLOW);
    thirdPartyConversions();
    // Register and Install the Service Worker.
    await this.SWRegistrar.register();
    // Register the generated Token from Firebase.
    await this.tokenRegistrar.register();
  }

  onPromptDeny() {
    this.analytics.track(NOTIFY.REJECT);
  }
}
