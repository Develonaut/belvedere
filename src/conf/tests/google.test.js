import { googleTrackAllow, googleFireConversion } from "conf/google";

const mockfn = jest.fn();
window.gtag = mockfn;

test("on googleTrackAllow(), Google's gtag method is called with an 'Allow' event", () => {
  googleTrackAllow();
  expect(mockfn).toHaveBeenCalledWith("event", "Allow");
});
