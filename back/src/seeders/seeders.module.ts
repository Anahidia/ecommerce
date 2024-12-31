import { Module } from '@nestjs/common';
import { SeedersService } from './seeders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesRepository } from 'src/categories/categories.repository';
import { ProductsRepository } from 'src/products/products.repository';
import { Categories } from 'src/entities/categoris.entities';
import { Products } from 'src/entities/products.enties';
import { CategoriesModule } from 'src/categories/categories.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports:[
    CategoriesModule,
    ProductsModule
  ],
  providers: [SeedersService],
  exports: [SeedersService],
})
export class SeedersModule {}
