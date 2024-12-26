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

async  getProducts(page:number,limit:number):Promise<Products[]> {
 let products =await this.productsRepository.find({
  relations:{
    category:true
  }
 })
 const start =(page -1)* limit
 const end=start+limit
 products=products.slice(start, end)
 return products;
  }
 async getProductsById(id:string){
   const product= this.productsRepository.findOneBy({id})
   if(!product) throw new NotFoundException(`product whit id ${id} not found`)

   return product
  }


  async  createProduct(){
 const categories=await this.categoriesRepository.find()
 data?.map(async (element)=>{
  const category= categories.find(
    (category)=> category.name === element.category
  )
  const product=new Products()

  product.name=element.name
  product.description=element.description
  product.price=element.price
  product.stock=element.stock
  product.imgUrl=element.imgUrl
  product.category=category

  await this.productsRepository
  .createQueryBuilder()
  .insert()
  .into(Products)
  .values(product)
  .orUpdate(['description','price','stock','imgUrl'],['name'])
  .execute()
 })

return 'productos agreagdos'    
  }

  async upDateProducts(id:string,product:Products){
  await this.productsRepository.update(id,product)
  const updateProduct=await this.productsRepository.findOneBy({id})
  if(!updateProduct) throw new NotFoundException(`product whit id ${id} not found`)

  return updateProduct
  }


}