import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './midelware/loggerGlobal';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';
import { SeedersService } from './seeders/seeders.service';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const seeders=app.get(SeedersService)
  await seeders.seed()
  app.use(loggerGlobal);
  app.useGlobalPipes(new ValidationPipe())

  app.enableCors({
    origin: true,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  const options= new DocumentBuilder()
  .setTitle('Nestjs api- ecommerce FSFT53')
  .setDescription('proyecto integrador de la especialidad backend del M4')
  .addBearerAuth()
  .build()

  const document = SwaggerModule.createDocument(app,options)
 SwaggerModule.setup('api',app,document)
 
 
  await app.listen(process.env.APP_HOST);

}
bootstrap();
