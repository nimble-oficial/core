export interface DiscordMessageDto {
  id: string;
  deleted: boolean;
  author: {
    id: string;
    username: string;
    tag: string;
  };
  channelId: string;
  guildId: string;
  commandName: string;
}
