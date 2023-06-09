import { Module } from "@nestjs/common";
import { DiscordRepository } from "../discord/discord.repository";
import { OpenAiRepository } from "../open-ai/open-ai.repository";
import { GuildsController } from "./guilds.controller";
import { GuildsService } from "./guilds.service";

@Module({
  controllers: [GuildsController],
  providers: [GuildsService, DiscordRepository, OpenAiRepository],
})
export class GuildsModule {}
