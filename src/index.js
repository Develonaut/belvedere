import "styles/normalize.css";
import "styles/skeleton.css";

import { appendQueryParams, clearCookies } from "conf/utils";

import "initers/jalapeno";

import { eraseAllCookies } from "conf/cookies";
import { parseQueryParams, serialize } from "conf/urls";

window.addEventListener("load", function() {
  if (clearCookies()) eraseAllCookies();
  // Takes the query params set in .env
  if (appendQueryParams()) {
    const urlParams = parseQueryParams();
    const envParams = parseQueryParams(process.env.QUERY_PARAMS);
    if (JSON.stringify(urlParams) !== JSON.stringify(envParams)) {
      window.location.href = `${window.location.origin}?${serialize(
        envParams
      )}`;
    }
  }

  document.getElementById("userSchema").innerHTML = JSON.stringify(
    window.Jalapeno.analytics.INTERNAL.schema,
    null,
    2
  );

  document.getElementById("prompt").addEventListener("click", function() {
    window.Jalapeno.prompt.requestPermission();
  });
});
