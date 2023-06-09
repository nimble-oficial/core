import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BuildersController } from "./builders.controller";
import { BuildersRepository } from "./builders.repository";
import { BuildersSchema } from "./builders.schema";
import { BuildersService } from "./builders.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Builders", schema: BuildersSchema }]),
  ],
  controllers: [BuildersController],
  providers: [BuildersService, BuildersRepository],
})
export class BuildersModule {}
