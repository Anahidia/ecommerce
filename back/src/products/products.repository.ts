import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/categoris.entities';
import { Products } from 'src/entities/products.enties';
import { Repository } from 'typeorm';
import * as data from '../utils/data.json'


@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Products)
    private productsRepository:Repository<Products>,
    @InjectRepository(Categories)
    private categoriesRepository:Repository<Categories>
  ){}

async  getProducts():Promise<Products[]> {
 let products =await this.productsRepository.find({
  relations:{
    category:true
  }
 })
 return products;
  }
 async getProductsById(id:string){
   const product= this.productsRepository.findOneBy({id})
   if(!product) throw new NotFoundException(`product whit id ${id} not found`)

   return product
  }


  async createProduct() {
    const categories = await this.categoriesRepository.find();
  
    for (const element of data) {
      // Buscar la categoría en la lista obtenida de la base de datos
      const categoryName = element.category; // Aquí 'category' es un string
      let category;
  
      if (categoryName) {
        category = categories.find((cat) => cat.name === categoryName);
  
        if (!category) {
          console.warn(`Category '${categoryName}' not found in the database for product: ${element.name}.`);
        }
      } else {
        console.warn(`No category provided for product: ${element.name}.`);
      }
  
      // Si la categoría es null, asignar 'uncategorized'
      if (!category) {
        category = categories.find((cat) => cat.name === 'uncategorized');
  
        if (!category) {
          console.log(`Creating default 'uncategorized' category.`);
          category = await this.categoriesRepository.save({
            name: 'uncategorized',
          });
          categories.push(category); // Actualizar la lista de categorías
        }
      }
  
      const product = new Products();
      product.name = element.name;
      product.description = element.description;
      product.price = element.price;
      product.stock = element.stock;
      product.imgUrl = element.imgUrl;
      product.category = category;
  
      try {
        await this.productsRepository
          .createQueryBuilder()
          .insert()
          .into(Products)
          .values(product)
          .orUpdate(['description', 'price', 'stock', 'imgUrl'], ['name'])
          .execute();
        console.log(`Product '${product.name}' added/updated successfully.`);
      } catch (error) {
        console.error(`Failed to add/update product: ${product.name}`, error);
      }
    }
  
    return 'Productos agregados';
  }
  

  async upDateProducts(id:string,product:Products){
  await this.productsRepository.update(id,product)
  const updateProduct=await this.productsRepository.findOneBy({id})
  if(!updateProduct) throw new NotFoundException(`product whit id ${id} not found`)

  return updateProduct
  }


}