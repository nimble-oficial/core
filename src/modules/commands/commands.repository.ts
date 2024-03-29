import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { DEFAULT_OPTION_VALUES } from "src/shared";
import { DiscordRepository } from "../discord/discord.repository";
import { DiscordMessageDto } from "../discord/dto/discord-message.dto";
import { Commands } from "./commands.schema";
import { CreateCommandDto, UpdateCommandDto } from "./dto";
import { ICommandsRepository } from "./interfaces";

@Injectable()
export class CommandsRepository implements ICommandsRepository {
  constructor(
    private discordRepository: DiscordRepository,
    @InjectModel(Commands.name) private commandsModel: Model<Commands>,
  ) {}

  async create(createCommandDto: CreateCommandDto): Promise<ObjectId> {
    const createdCommand = await this.commandsModel.create({
      ...createCommandDto,
      allowedChannel: DEFAULT_OPTION_VALUES.allowedChannel,
      allowedRole: DEFAULT_OPTION_VALUES.allowedRole,
      createdAt: new Date(),
    });

    return createdCommand.id;
  }

  async findByNameAndGuildId(
    commandName: string,
    guildId: string,
  ): Promise<Commands | null> {
    return this.commandsModel.findOne({
      name: commandName,
      guildId,
    });
  }

  async findById(commandId: string): Promise<Commands | null> {
    return this.commandsModel
      .findById(commandId)
      .select(
        "enabled name description builderId createdAt guildId allowedChannel allowedRole sendCommandNotEnabledMessage commandNotEnabledMessage",
      );
  }

  async findAllByGuildId(guildId: string): Promise<Commands[]> {
    return this.commandsModel
      .find({
        guildId,
      })
      .select(
        "enabled name description builderId createdAt allowedChannel allowedRole",
      )
      .sort({
        createdAt: -1,
      });
  }

  async update(updateCommandDto: UpdateCommandDto): Promise<void> {
    await this.commandsModel.updateOne(
      {
        _id: updateCommandDto.commandId,
      },
      {
        ...updateCommandDto,
        updatedAt: new Date(),
      },
    );
  }

  async delete(commandId: string): Promise<void> {
    await this.commandsModel.deleteOne({
      _id: commandId,
    });
  }

  async findByBuilderId(builderId: string): Promise<Commands | null> {
    return this.commandsModel
      .findOne({
        builderId,
      })
      .select("name enabled description createdAt guildId");
  }

  async deleteByBuilderId(builderId: string): Promise<void> {
    await this.commandsModel.deleteMany({
      builderId,
    });
  }

  async sendNotEnabledMessage(
    content: string,
    message: DiscordMessageDto,
  ): Promise<void> {
    return this.discordRepository.replyMessage(content, message);
  }

  async sendNotFoundMessage(
    commandName: string,
    message: DiscordMessageDto,
  ): Promise<void> {
    return this.discordRepository.sendPlainText(
      `O comando "${commandName}" não existe.`,
      message.channelId,
    );
  }

  async sendMessage(
    content: string,
    message: DiscordMessageDto,
  ): Promise<void> {
    await this.discordRepository.sendPlainText(content, message.channelId);
  }

  async mentionMessageOwner(
    content: string,
    message: DiscordMessageDto,
  ): Promise<void> {
    await this.discordRepository.mentionMessageOwner(
      content,
      message.channelId,
      message.author.id,
    );
  }

  async replyMessage(
    content: string,
    message: DiscordMessageDto,
  ): Promise<void> {
    await this.discordRepository.replyMessage(content, message);
  }

  async showTyping(message: DiscordMessageDto): Promise<void> {
    await this.discordRepository.showTyping(message);
  }
}
