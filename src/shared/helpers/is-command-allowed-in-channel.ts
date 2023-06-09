export const isCommandAllowedInChannel = (
  allowedChannelId = "all",
  channelIdWhereMessageCame: string,
) => {
  if (allowedChannelId.toLowerCase() === "all") {
    return true;
  }

  return (
    allowedChannelId.toLowerCase() === channelIdWhereMessageCame.toLowerCase()
  );
};
