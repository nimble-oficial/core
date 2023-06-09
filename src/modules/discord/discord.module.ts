import { Module } from "@nestjs/common";
import { DiscordRepository } from "./discord.repository";

@Module({
  controllers: [],
  providers: [DiscordRepository],
})
export class DiscordModule {}
