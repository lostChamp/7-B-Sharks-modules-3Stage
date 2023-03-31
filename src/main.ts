import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";


async function start() {
    const PORT = process.env.PORT || 8000;
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle("7-B IT-Sharks 3Module REST API")
        .setDescription("Документация REST API на NestJS")
        .setVersion("1.0.0")
        .addTag("7-B IT-Sharks")
        .build()

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("/api/docs", app, document);

    await app.listen(PORT, () => console.log(`Сервер начал прослушивание на http://localhost:${PORT}`));
}

start();