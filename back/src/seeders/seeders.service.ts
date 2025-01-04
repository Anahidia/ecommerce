import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesRepository } from 'src/categories/categories.repository';
import { ordersRepository } from 'src/orders/orders.repository';
import { ProductsRepository } from 'src/products/products.repository';
import { UserRepository } from 'src/users/users.repository';

@Injectable()
export class SeedersService {
    constructor(
      
        private readonly categoriesRepository:CategoriesRepository,
   
        private readonly productsRepository: ProductsRepository,

        private readonly usersRepository: UserRepository,

        private readonly ordersRepository: ordersRepository,
    ){}
    async seed() {
        console.log('Seeding categories...');
        await this.categoriesRepository.addCategories();

        console.log('categories added');
    
        console.log('Seeding products...');
        await this.productsRepository.createProduct();

        console.log('products added');

      //  console.log('Seeding Users...');
       // await this.usersRepository.seedUsers();

       // console.log('Seeding Orders...');
        //await this.ordersRepository.seedOrders();

        console.log('Seeding completed!');
      }
}
