import { Module } from "@nestjs/common";
import { DiscordRepository } from "../discord/discord.repository";

import { GuildsController } from "./guilds.controller";
import { GuildsService } from "./guilds.service";

@Module({
  controllers: [GuildsController],
  providers: [GuildsService, DiscordRepository],
})
export class GuildsModule {}
