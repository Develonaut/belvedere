import * as yup from "yup";
import { getCookie, setCookie } from "conf/cookies";
import { generateUUID, getTodaysDate } from "conf/utils";
import { parseQueryParams, getDocumentSrcParams } from "conf/urls";

export default class User {
  constructor() {
    this.validationSchema = this.shapeValidationSchema();
    this.schema = this.buildUserSchema();
    this.validateUser().catch(({ errors }) => {
      throw new Error(
        `Critical User Schema values are missing: ${JSON.stringify(errors)}`
      );
    });
  }

  // TODO: Define this better, we should know what we
  // expect in this object for all our tracking.
  shapeValidationSchema() {
    return yup.object().shape({
      userId: yup.string().required(),
      userClass: yup.string().required(),
      cohortId: yup.string().required(),
      imp: yup.string().required()
    });
  }

  buildUserSchema() {
    const cookies = [
      { key: "userId", value: generateUUID() },
      { key: "userClass", value: getTodaysDate(), expires: 1 },
      {
        key: "cohortId",
        value: `${Math.floor(Math.random() * 100) + 1}`
      }
    ];

    return cookies.reduce(
      (props, { key, value, expires = 36500 }) => {
        return {
          ...props,
          [key]:
            getCookie(key) || setCookie({ key, value, options: { expires } })
        };
      },
      {
        // Get query params from url and
        // add them to our User props.
        ...getDocumentSrcParams(),
        ...parseQueryParams()
      }
    );
  }

  validateUser = async () => {
    return await this.validationSchema.validate(this.schema);
  };
}
