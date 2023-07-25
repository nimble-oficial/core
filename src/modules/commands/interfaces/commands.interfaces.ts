import { ObjectId } from "mongoose";
import { DiscordMessageDto } from "src/modules/discord/dto/discord-message.dto";
import { Commands } from "../commands.schema";
import { CreateCommandDto } from "../dto/create-command.dto";
import { UpdateCommandDto } from "../dto/update-command.dto";

export interface ICommandsRepository {
  create(createCommandDto: CreateCommandDto): Promise<ObjectId>;
  findByNameAndGuildId(
    commandName: string,
    guildId: string,
  ): Promise<Commands | null>;

  findAllByGuildId(guildId: string): Promise<Commands[]>;

  update(updateCommandDto: UpdateCommandDto): Promise<void>;

  delete(commandId: string): Promise<void>;

  findByBuilderId(builderId: string): Promise<Commands | null>;

  deleteByBuilderId(builderId: string): Promise<void>;

  sendNotEnabledMessage(
    content: string,
    message: DiscordMessageDto,
  ): Promise<void>;

  sendNotFoundMessage(
    commandName: string,
    message: DiscordMessageDto,
  ): Promise<void>;

  sendMessage(content: string, message: DiscordMessageDto): Promise<void>;

  mentionMessageOwner(
    content: string,
    message: DiscordMessageDto,
  ): Promise<void>;

  replyMessage(content: string, message: DiscordMessageDto): Promise<void>;

  showTyping(message: DiscordMessageDto): Promise<void>;
}
