import EventEmitter from "lib/EventEmitter";
import { TOKEN } from "conf/constCapsule";
import { getUrls, serialize } from "conf/urls";
import { getCookie, setCookie } from "conf/cookies";

export default class TokenRegistrar extends EventEmitter {
  constructor({ schema, Firebase }) {
    super();
    if (!schema) throw new Error("User's schema is required in TokenRegistrar");
    if (!Firebase)
      throw new Error("Firebase instance is required in TokenRegistrar");
    this.INTERNAL = {
      schema,
      Firebase
    };
  }

  register = async () => {
    this.emit(TOKEN.SUBSCRIBING);
    const isSubscribed = getCookie("token");
    if (isSubscribed) return this.emit(TOKEN.SUBSCRIBED);
    try {
      const token = await this.INTERNAL.Firebase.getToken();
      this.subscribeToken(token);
    } catch (error) {
      throw new Error(error);
    }
  };

  async subscribeToken(token) {
    try {
      setCookie({ key: "token", value: token, options: { expires: 36500 } });
      await fetch(
        `${getUrls().TOKEN_SUBSCRIBE}?${serialize(this.INTERNAL.schema)}`
      );
      this.emit(TOKEN.SUBSCRIBED);
    } catch (error) {
      throw new Error(error);
    }
  }
}
