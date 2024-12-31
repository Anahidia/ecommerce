import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.enties';
import { Categories } from 'src/entities/categoris.entities';

@Module({
  imports:[TypeOrmModule.forFeature([Products,Categories])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  exports:[ProductsRepository]
})
export class ProductsModule {}
