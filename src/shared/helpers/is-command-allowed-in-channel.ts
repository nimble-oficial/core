export const isCommandAllowedInChannel = (
  allowedChannelId = "all",
  messageChannelId: string,
) => {
  return (
    allowedChannelId === messageChannelId ||
    allowedChannelId.toLowerCase() === "all"
  );
};
