export const isCommandAllowedInRole = (
  allowedRoleId = "all",
  messageChannelId: string,
) => {
  return (
    allowedRoleId === messageChannelId || allowedRoleId.toLowerCase() === "all"
  );
};
