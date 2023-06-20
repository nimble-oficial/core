import { DEFAULT_OPTION_VALUES } from "../../constants/default-option-values";

export const isCommandAllowedInChannel = (
  allowedChannelId = DEFAULT_OPTION_VALUES.allowedChannel.id,
  messageChannelId: string,
): boolean => {
  return (
    allowedChannelId === messageChannelId ||
    allowedChannelId?.toLowerCase() === DEFAULT_OPTION_VALUES.allowedChannel.id
  );
};
