import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesRepository } from 'src/categories/categories.repository';
import { ProductsRepository } from 'src/products/products.repository';

@Injectable()
export class SeedersService {
    constructor(
      
        private readonly categoriesRepository:CategoriesRepository,
   
        private readonly productsRepository: ProductsRepository
    ){}
    async seed() {
        console.log('Seeding categories...');
        await this.categoriesRepository.addCategories();
    
        console.log('Seeding products...');
        await this.productsRepository.createProduct();
    
        console.log('Seeding completed!');
      }
}
