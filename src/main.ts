import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start() {
  try {
    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create(AppModule);
    app.enableCors({});

    app.setGlobalPrefix("api");

    app.useGlobalPipes(new ValidationPipe());

    app.use(cookieParser());

    const config = new DocumentBuilder()
      .setTitle("ShifoNet project")
      .setDescription("ShifoNet REST API")
      .setVersion("1.0")
      .addTag("imtixon")
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document);

    await app.listen(PORT, () => {
      console.log(`Server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
