import { Injectable } from '@nestjs/common';
import {  ProductsRepository } from './products.repository';


@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}
  getProductsService(page:number,limit:number) {
  return this.productsRepository.getProducts(page,limit)
  }
  getProductByIdService(id:string){
    return this.productsRepository.getProductsById(id)
  }
  createProductsService(){
    return this.productsRepository.createProduct()
  }
  upDateProductsService(id,upProducts){
    return this.productsRepository.upDateProducts(id,upProducts)
  }

}
