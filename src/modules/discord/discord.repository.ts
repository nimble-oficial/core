import { Injectable } from "@nestjs/common";
import { Routes } from "discord-api-types/v10";
import { rest } from "src/shared/lib/discord-js";

import { DiscordMessageDto } from "./dto/discord-message.dto";

@Injectable()
export class DiscordRepository {
  async sendPlainText(content: string, channelId: string) {
    await rest.post(Routes.channelMessages(channelId), {
      body: { content },
    });
  }

  async mentionMessageOwner(
    content: string,
    channelId: string,
    authorId: string,
  ) {
    await rest.post(Routes.channelMessages(channelId), {
      body: { content: `<@${authorId}>, ${content}` },
    });
  }

  async replyMessage(replyContent: string, message: DiscordMessageDto) {
    await rest.post(Routes.channelMessages(message.channelId), {
      body: {
        content: replyContent,
        message_reference: {
          message_id: message.id,
          guild_id: message.guildId,
          channel_id: message.channelId,
        },
      },
    });
  }

  async sendCommandNotFoundMessage(commandName: string, channelId: string) {
    await this.sendPlainText(
      `O comando "${commandName}" não existe.`,
      channelId,
    );
  }

  async getCurrentUserGuilds(token: string) {
    return rest.get(Routes.userGuilds(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getGuildMembers(id: string) {
    return rest.get(Routes.guildMembers(id));
  }

  async getGuildById(id: string) {
    return await rest.get(Routes.guild(id));
  }

  async getGuildChannels(id: string, query: any) {
    return rest.get(Routes.guildChannels(id), {
      query,
    });
  }

  async showTyping(message: DiscordMessageDto) {
    return rest.post(Routes.channelTyping(message.channelId));
  }

  async getGuildRoles(id: string) {
    return rest.get(Routes.guildRoles(id));
  }
}
