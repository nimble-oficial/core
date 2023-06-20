import { isCommandAllowedInChannel } from ".";

describe("isCommandAllowedInChannel()", () => {
  it("if allowedChannelId is not provided, it should use the default value", () => {
    expect(isCommandAllowedInChannel(undefined, "123")).toBe(true);
  });

  it("checks if the message channel id is the same as the allowed channel id", () => {
    expect(isCommandAllowedInChannel("123", "123")).toBe(true);
    expect(isCommandAllowedInChannel("455", "123")).toBe(false);
    expect(isCommandAllowedInChannel("123456", "123456")).toBe(true);
    expect(isCommandAllowedInChannel("foo123bar", "foo123bar")).toBe(true);
    expect(isCommandAllowedInChannel(null, "foo123bar")).toBe(false);
  });
});
