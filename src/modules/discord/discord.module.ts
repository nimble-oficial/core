import { Module } from "@nestjs/common";
import { OpenAiRepository } from "../open-ai/open-ai.repository";
import { DiscordRepository } from "./discord.repository";

@Module({
  controllers: [],
  providers: [DiscordRepository, OpenAiRepository],
})
export class DiscordModule {}
