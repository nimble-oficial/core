import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
} from "@nestjs/common";
import { HttpResponses } from "src/shared/helpers/responses";
import { GuildsService } from "./guilds.service";

@Controller("guilds")
export class GuildsController {
  constructor(private readonly guildsService: GuildsService) {}

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  async findById(@Param("id") id: string) {
    try {
      const guild = await this.guildsService.findById(id);
      return HttpResponses.parseSuccess(guild, HttpStatus.OK);
    } catch (err) {
      return HttpResponses.throwException(err.message, err?.status);
    }
  }

  @Get(":id/roles")
  @HttpCode(HttpStatus.OK)
  async getGuildRoles(@Param("id") id: string) {
    console.log(id);
    try {
      const roles = await this.guildsService.getGuildRoles(id);
      return HttpResponses.parseSuccess(roles, HttpStatus.OK);
    } catch (err) {
      return HttpResponses.throwException(err.message, err?.status);
    }
  }

  // @Get("@me")
  // @HttpCode(HttpStatus.OK)
  // async getCurrentUserGuilds() {
  //   try {
  //     const guild = await this.guildsService.getCurrentUserGuilds();
  //     return HttpResponses.parseSuccess(guild, HttpStatus.OK);
  //   } catch (err) {
  //     return HttpResponses.throwException(err.message, err?.status);
  //   }
  // }

  @Get(":id/members")
  @HttpCode(HttpStatus.OK)
  async getMembers(@Param("id") id: string) {
    try {
      const members = await this.guildsService.getGuildMembers(id);
      return HttpResponses.parseSuccess(members, HttpStatus.OK);
    } catch (err) {
      return HttpResponses.throwException(err.message, err?.status);
    }
  }

  @Get(":id/channels")
  @HttpCode(HttpStatus.OK)
  async getChannels(@Param("id") id: string, @Query() query: any) {
    try {
      const channels = await this.guildsService.getGuildChannels(id, query);
      return HttpResponses.parseSuccess(channels, HttpStatus.OK);
    } catch (err) {
      return HttpResponses.throwException(err.message, err?.status);
    }
  }
}
