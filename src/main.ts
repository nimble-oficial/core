import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: "*",
    },
  });

  // const rmqService = app.get<RmqService>(RmqService);

  // app.connectMicroservice<RmqOptions>(rmqService.getOptions("COMMANDS", true));
  // app.startAllMicroservices();

  await app.listen(8000);
}
bootstrap();
