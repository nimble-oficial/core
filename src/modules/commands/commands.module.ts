import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BuildersRepository } from "../builders/builders.repository";
import { BuildersSchema } from "../builders/builders.schema";
import { DiscordRepository } from "../discord/discord.repository";

import { CommandsController } from "./commands.controller";
import { CommandsRepository } from "./commands.repository";
import { CommandsSchema } from "./commands.schema";
import { CommandsService } from "./commands.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Commands", schema: CommandsSchema }]),
    MongooseModule.forFeature([{ name: "Builders", schema: BuildersSchema }]),
  ],
  controllers: [CommandsController],
  providers: [
    CommandsService,
    CommandsRepository,
    BuildersRepository,
    DiscordRepository,
  ],
})
export class CommandsModule {}
