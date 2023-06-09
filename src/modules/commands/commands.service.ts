/* eslint-disable @typescript-eslint/ban-ts-comment */
import { HttpStatus, Injectable } from "@nestjs/common";
import { BuildersRepository } from "../builders/builders.repository";
import { CommandsRepository } from "./commands.repository";
import { Commands } from "./commands.schema";
import {
  CreateCommandDto,
  CreateCommandDtoOutput,
  createCommandDtoSchema,
} from "./dto/create-command.dto";

import {
  UpdateCommandDto,
  updateCommandDtoSchema,
} from "./dto/update-command.dto";

import { HttpException } from "src/shared/exceptions";

import { isCommandAllowedInChannel } from "src/shared/helpers/is-command-allowed-in-channel";
import { Zod } from "src/shared/helpers/zod/validator";
import { DiscordMessageDto } from "../discord/dto/discord-message.dto";
import {
  DeleteCommandDto,
  deleteCommandDtoSchema,
} from "./dto/delete-command.dto";
import { RunCommandDto } from "./dto/run-command.dto";

@Injectable()
export class CommandsService {
  constructor(
    private commandsRepository: CommandsRepository,
    private buildersRepository: BuildersRepository,
  ) {}

  /**
   *`Create` method creates a new command in database.
   *
   * Before create, validate DTO then check if command already exists. If exists, throw an error.
   *
   * After validations, creates a new builder and command in database.
   *
   * @throws {ZodError} if DTO is invalid
   * @throws {HttpException} if command already exists
   * @param createCommandDto data to create a new command
   * @returns {Promise<CreateCommandDtoOutput>} created command id and builder id
   */
  async create(
    createCommandDto: CreateCommandDto,
  ): Promise<CreateCommandDtoOutput> {
    const payload = Zod.parseAndValidate(
      createCommandDtoSchema,
      createCommandDto,
    );

    const alreadyExists = await this.commandsRepository.findByNameAndGuildId(
      payload.name,
      payload.guildId,
    );

    if (alreadyExists) {
      throw new HttpException("Command already exists", HttpStatus.BAD_REQUEST);
    }

    const createdBuilder = await this.buildersRepository.create({
      commandName: payload.name,
      guildId: payload.guildId,
    });

    const createdCommandId = await this.commandsRepository.create({
      ...payload,
      builderId: createdBuilder._id,
    });

    return { _id: createdCommandId.toString(), builderId: createdBuilder._id };
  }

  /**
   *`findAllByGuildId` method finds all commands by guild id. If no commands are found, returns an empty array.
   *
   * @param {string} guildId guild id to find command
   * @returns {Promise<Commands[]>} all found commands
   */
  async findAllByGuildId(guildId: string): Promise<Commands[]> {
    return this.commandsRepository.findAllByGuildId(guildId);
  }

  /**
   *`findByBuilderId` method finds a command by builder id.
   *
   * If command not found, throws an error.
   *
   * @throws {HttpException} if command not found
   * @param {string} builderId builder id to find command
   * @returns {Promise<Commands>} found command
   */
  async findByBuilderId(builderId: string): Promise<Commands> {
    const foundCommand = await this.commandsRepository.findByBuilderId(
      builderId,
    );

    if (!foundCommand) {
      throw new HttpException("Command not found", HttpStatus.NOT_FOUND);
    }

    return foundCommand;
  }

  /**
   *`update` method updates a command.
   *
   * Before update, validate DTO then check if command with same name already exists. If exists, throw an error.
   *
   * After validations, updates successfully.
   *
   * @throws {ZodError} if DTO is invalid
   * @throws {HttpException} if command with same name already exists
   * @param updateCommandDto data to update command
   * @returns void
   */
  async update(updateCommandDto: UpdateCommandDto): Promise<void> {
    Zod.parseAndValidate(updateCommandDtoSchema, updateCommandDto);

    const foundCommand = await this.commandsRepository.findByNameAndGuildId(
      updateCommandDto.name,
      updateCommandDto.guildId,
    );

    console.log(foundCommand, updateCommandDto);

    if (foundCommand && foundCommand.name !== updateCommandDto.name) {
      throw new HttpException(
        "Command with same name already exists",
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.commandsRepository.update(updateCommandDto);
  }

  /**
   *`delete` method deletes a command.
   *
   * Before delete, validate DTO then check if builder exists. If not exists, throw an error.
   *
   * After validations, deletes command and builder successfully.
   *
   * @throws {ZodError} if DTO is invalid
   * @throws {HttpException} if builder not found
   * @param deleteCommandDto data to update command
   * @returns void
   */
  async delete(deleteCommandDto: DeleteCommandDto): Promise<void> {
    const payload = Zod.parseAndValidate(
      deleteCommandDtoSchema,
      deleteCommandDto,
    );

    const foundBuilder = await this.buildersRepository.findById(
      payload.builderId,
    );

    if (!foundBuilder) {
      throw new HttpException("Command not found", HttpStatus.NOT_FOUND);
    }

    await Promise.all([
      this.buildersRepository.delete(foundBuilder._id),
      this.commandsRepository.deleteByBuilderId(foundBuilder._id),
    ]);
  }

  /**
   *`sendMessageCommandNotEnabled` method sends a message if command is not enabled.
    If command has `canSendNotEnabledMessage` option enabled, sends a "Command not enabled" message.
   *
   * @param command command (from database) to check if is enabled
   * @param messageFromDiscord message from discord
   * @returns void
   */
  async sendMessageCommandNotEnabled(
    command: Commands,
    messageFromDiscord: DiscordMessageDto,
  ): Promise<void> {
    const isCommandEnabled = command?.enabled ?? true;

    if (!isCommandEnabled) {
      if (command.options?.canSendNotEnabledMessage ?? false) {
        await this.commandsRepository.sendNotEnabledMessage(
          command.options.notEnabledMessage,
          messageFromDiscord,
        );
        return;
      }

      return;
    }
  }

  /**
   *`sendMessageCommandNotFound` method sends a message if command is not found in database.
   *
   * @param commandName command name
   * @param messageFromDiscord message from discord
   * @returns void
   */
  async sendMessageCommandNotFound(
    commandName: string,
    messageFromDiscord: DiscordMessageDto,
  ): Promise<void> {
    await this.commandsRepository.sendNotFoundMessage(
      commandName,
      messageFromDiscord,
    );
  }

  /**
   *`checkIfCommandIsAllowedInChannel` method checks if command is allowed in channel.
   * The allowed channels are defined in `allowedChannel` property in command.
   *
   * It calls `isCommandAllowedInChannel` function to check if command is allowed in channel.
   * If not allowed, replies for message owner with "Command not allowed" content.
   *
   * @param Commands command
   * @param messageFromDiscord message from discord
   * @returns void
   */
  async checkIfCommandIsAllowedInChannel(
    command: Commands,
    messageFromDiscord: DiscordMessageDto,
  ) {
    const canSendInChannel = isCommandAllowedInChannel(
      command.allowedChannel,
      messageFromDiscord.channelId,
    );

    if (!canSendInChannel) {
      await this.commandsRepository.replyMessage(
        "Opa! Esse comando não pode ser executado nesse canal.",
        messageFromDiscord,
      );

      return;
    }
  }

  /**
   *`getCommandFromMessage` method gets a command from message. A command is represented by a string that starts with prefix.
   Example: `!help`. In this case, `!` is the prefix.
   *
   * In some cases, command can be represented by a string that starts with prefix and has a space after its name.
   * If that space exists, it will be represented by a string like this: `!help <arg>`.
   * We consider that command name is `help` and a message/content for the command is `arg`.
   *
   * The `<arg>` can be helpful to send a message to a command. For example, `!chatgpt hello world` will send `hello world` to `chatgpt` command.
   *
   * If command is not found, sends a message to message owner with "Command not found" content.
   * If command exists, returns it.
   *
   * @param messageFromDiscord message from discord
   * @returns void
   */
  async getCommandFromMessage(
    messageFromDiscord: DiscordMessageDto,
  ): Promise<Commands | null> {
    const commandName = messageFromDiscord.commandName.split(": ")[0];

    const foundCommand = await this.commandsRepository.findByNameAndGuildId(
      commandName,
      messageFromDiscord.guildId,
    );

    if (!foundCommand) {
      await this.sendMessageCommandNotFound(commandName, messageFromDiscord);
      return;
    }

    return foundCommand;
  }

  /**
   *`run` method runs a command. It gets a command from discord message.
   * First, check if message is sent from a bot. If true, then nothing happens. It avoid infinite loops.
   *
   * After that, gets a command from message, find command in database and check if command is enabled.
   * If not enabled, calls `sendMessageCommandNotEnabled` function to send a message to message owner.
   *
   * Also, checks if command is allowed in channel.
   * Finally, gets builder from database and send builder to queue to be processed.
   *
   * @param runCommandDto data to run command
   * @param messageFromDiscord message from discord
   * @returns void
   */
  async run(runCommandDto: RunCommandDto): Promise<void> {
    const { author } = runCommandDto;
    const discordMessage = runCommandDto as DiscordMessageDto;

    if (author?.bot) return;

    const foundCommand = await this.getCommandFromMessage(discordMessage);

    await this.sendMessageCommandNotEnabled(foundCommand, discordMessage);
    await this.checkIfCommandIsAllowedInChannel(foundCommand, discordMessage);

    const builder = await this.buildersRepository.findById(
      foundCommand.builderId,
    );
  }
}
