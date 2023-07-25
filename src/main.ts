import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: "*",
    },
  });

  await app.listen(8000);
}
bootstrap();
