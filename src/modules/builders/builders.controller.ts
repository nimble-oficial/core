import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { HttpResponses } from "src/shared/responses";
import { BuildersService } from "./builders.service";
import { CreateBuilderDto } from "./dto/create-builder.dto";
import { SaveBuilderDto } from "./dto/save-builder.dto";

@Controller("builders")
export class BuildersController {
  constructor(private readonly buildersService: BuildersService) {}

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  async save(
    @Param() params: { id: string },
    @Body() saveBuilderDto: SaveBuilderDto,
  ) {
    try {
      await this.buildersService.save({
        ...saveBuilderDto,
        builderId: params.id,
      });
      return HttpResponses.parseSuccess(null, HttpStatus.OK);
    } catch (err) {
      return HttpResponses.throwException(err.message, err?.status);
    }
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  async findById(@Param() params: { id: string }) {
    try {
      const builderData = await this.buildersService.findBy(params.id);
      return HttpResponses.parseSuccess(builderData, HttpStatus.OK);
    } catch (err) {
      return HttpResponses.throwException(err.message, err?.status);
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createBuilderDto: CreateBuilderDto) {
    try {
      await this.buildersService.create(createBuilderDto);
      return HttpResponses.parseSuccess(null, HttpStatus.CREATED);
    } catch (err) {
      return HttpResponses.throwException(err.message, err?.status);
    }
  }
}
