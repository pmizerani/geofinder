import {NestFactory} from '@nestjs/core';
import {ApplicationModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {ConfigService} from './config/config.service';
import {AppLogger} from './app.logger';
import {ValidationPipe} from '@nestjs/common';

const configService = new ConfigService(`${process.env.NODE_ENV ? process.env.NODE_ENV : 'development'}.env`);

/**
 * bootstrap
 * @returns {Promise<void>}
 */
async function bootstrap() {

    const app = await NestFactory.create(ApplicationModule, {
        logger: new AppLogger(),
    });

    if (!process.env.NODE_ENV || ('development' === process.env.NODE_ENV || 'test' === process.env.NODE_ENV)) {
        const options = new DocumentBuilder()
            .setTitle('Geolocation Finder Project NestJS')
            .setDescription('Geolocation Finder API')
            .setVersion('1.0.0')
            .addTag('API')
            .build();
        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup('api', app, document);
    }

    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(configService.config.PORT);

    console.info(`API running...`);
    console.info(`PORT: ${configService.config.PORT}`);
    console.info(`ENV: ${!process.env.NODE_ENV ? "development" : process.env.NODE_ENV}`);
}

bootstrap();
