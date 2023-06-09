import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { HttpResponses } from "src/modules/discord/responses";
import { CommandsService } from "./commands.service";
import { CreateCommandDto } from "./dto/create-command.dto";
import { DeleteCommandDto } from "./dto/delete-command.dto";
import { RunCommandDto } from "./dto/run-command.dto";
import { UpdateCommandDto } from "./dto/update-command.dto";

@Controller("commands")
export class CommandsController {
  constructor(private readonly commandsService: CommandsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCommandDto: CreateCommandDto) {
    try {
      const createdBuilderId = await this.commandsService.create(
        createCommandDto,
      );
      return HttpResponses.parseSuccess(createdBuilderId, HttpStatus.CREATED);
    } catch (err) {
      return HttpResponses.throwException(err.message, err?.status);
    }
  }

  @Get("by-guild/:guildId")
  @HttpCode(HttpStatus.OK)
  async findAllByGuildId(@Param() params: { guildId: string }) {
    try {
      const commands = await this.commandsService.findAllByGuildId(
        params.guildId,
      );

      return HttpResponses.parseSuccess(commands, HttpStatus.OK);
    } catch (err) {
      return HttpResponses.throwException(err.message, err?.status);
    }
  }

  @Get("by-builder/:builderId")
  @HttpCode(HttpStatus.OK)
  async findByBuilderId(@Param() params: { builderId: string }) {
    try {
      const command = await this.commandsService.findByBuilderId(
        params.builderId,
      );

      return HttpResponses.parseSuccess(command, HttpStatus.OK);
    } catch (err) {
      return HttpResponses.throwException(err.message, err?.status);
    }
  }

  @Post("run")
  @HttpCode(HttpStatus.OK)
  async run(@Body() runCommandDto: RunCommandDto) {
    try {
      return this.commandsService.run(runCommandDto);
    } catch (err) {
      return HttpResponses.throwException(err.message, err?.status);
    }
  }

  @Delete("/by-builder/:builderId/:commandId")
  @HttpCode(HttpStatus.OK)
  async delete(@Param() params: DeleteCommandDto) {
    try {
      const { builderId, commandId } = params;

      await this.commandsService.delete({ builderId, commandId });
      return HttpResponses.parseSuccess(null, HttpStatus.OK);
    } catch (err) {
      return HttpResponses.throwException(err.message, err?.status);
    }
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  async update(
    @Param() params: { id: string },
    @Body() updateCommandDto: UpdateCommandDto,
  ) {
    try {
      await this.commandsService.update({
        ...updateCommandDto,
        commandId: params.id,
      });
      return HttpResponses.parseSuccess(null, HttpStatus.OK);
    } catch (err) {
      return HttpResponses.throwException(err.message, err?.status);
    }
  }
}
