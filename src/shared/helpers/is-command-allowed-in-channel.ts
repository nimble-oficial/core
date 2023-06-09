export const isCommandAllowedInChannel = (
  allowedChannelId = "all",
  channelIdWhereMessageCame: string,
) => {
  if (allowedChannelId === "all") {
    return true;
  }

  return allowedChannelId === channelIdWhereMessageCame;
};
