import { DEFAULT_OPTION_VALUES } from "src/shared/constants";

export const isCommandAllowedInChannel = (
  allowedChannelId = DEFAULT_OPTION_VALUES.allowedChannel.id,
  messageChannelId: string,
): boolean => {
  return (
    allowedChannelId === messageChannelId ||
    allowedChannelId.toLowerCase() === DEFAULT_OPTION_VALUES.allowedChannel.id
  );
};
