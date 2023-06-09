import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { MongooseModule } from "@nestjs/mongoose";
import { BuildersRepository } from "../builders/builders.repository";
import { BuildersSchema } from "../builders/builders.schema";
import { DiscordRepository } from "../discord/discord.repository";
import { OpenAiRepository } from "../open-ai/open-ai.repository";
import { CommandsController } from "./commands.controller";
import { CommandsRepository } from "./commands.repository";
import { CommandsSchema } from "./commands.schema";
import { CommandsService } from "./commands.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Commands", schema: CommandsSchema }]),
    MongooseModule.forFeature([{ name: "Builders", schema: BuildersSchema }]),
    ClientsModule.register([
      { name: "MATH_SERVICE", transport: Transport.TCP },
    ]),
  ],
  controllers: [CommandsController],
  providers: [
    CommandsService,
    CommandsRepository,
    BuildersRepository,
    DiscordRepository,
    OpenAiRepository,
  ],
})
export class CommandsModule {}
