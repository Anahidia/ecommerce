import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm'
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { JwtModule } from '@nestjs/jwt';
import { SeedersModule } from './seeders/seeders.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true, 
      load:[typeOrmConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory:(configService:ConfigService)=>configService.get('typeorm')
        
    }) ,
    UserModule,
    ProductsModule,
    AuthModule, 
    CategoriesModule,
     OrdersModule, 
     FileUploadModule,
     JwtModule.register({
      global:true,
      secret: process.env.JWT_SECRET,
      signOptions:{
        expiresIn:'1h'
      }
     }),
     SeedersModule
    
    ],
    controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
  