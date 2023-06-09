import { Injectable } from "@nestjs/common";
import { DiscordRepository } from "../discord/discord.repository";

@Injectable()
export class GuildsService {
  constructor(private discordRepository: DiscordRepository) {}

  async getGuildMembers(id: string) {
    return this.discordRepository.getGuildMembers(id);
  }

  async findById(id: string) {
    return this.discordRepository.getGuildById(id);
  }

  async getGuildChannels(id: string, query: any) {
    return this.discordRepository.getGuildChannels(id, query);
  }

  async getCurrentUserGuilds(token: string) {
    return this.discordRepository.getCurrentUserGuilds(token);
  }

  async getGuildRoles(id: string) {
    return this.discordRepository.getGuildRoles(id);
  }
}
