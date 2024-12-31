import { Injectable } from '@nestjs/common';
import { ordersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
    constructor(private ordersRepository:ordersRepository){}

    addOrdersService(userId:string,products:any){
 return this.ordersRepository.addOrder(userId,products)
    }

    getOrderService(id:string){
  return this.ordersRepository.getOrder(id)
    }
}
