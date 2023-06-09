import { Module } from "@nestjs/common";
import { OpenAiRepository } from "./open-ai.repository";

@Module({
  controllers: [],
  providers: [OpenAiRepository],
})
export class OpenAiModule {}
