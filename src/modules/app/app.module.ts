import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { LoggerMiddleware } from "src/shared/middlewares";
import { BuildersModule } from "../builders/builders.module";
import { CommandsModule } from "../commands/commands.module";
import { DiscordModule } from "../discord/discord.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    BuildersModule,
    CommandsModule,
    DiscordModule,
    MongooseModule.forRoot("mongodb://localhost:27017/discord-bot-creator"),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
