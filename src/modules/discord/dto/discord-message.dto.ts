export interface DiscordMessageDto {
  id: string;
  deleted: boolean;
  author: {
    id: string;
    username: string;
    tag: string;
    bot: boolean;
  };
  channelId: string;
  guildId: string;
  commandName: string;
}
