
import{Injectable, NotFoundException} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetails } from 'src/entities/orderDetails.entities';
import { Orders } from 'src/entities/orders.entities';
import { Products } from 'src/entities/products.enties';
import { Users } from 'src/entities/user.entities';
import { Repository } from 'typeorm';

@Injectable()
export class ordersRepository{
    constructor(
        @InjectRepository(Orders)
        private ordersRepository:Repository<Orders>,

        @InjectRepository(OrderDetails)
        private orderDetailsRepository:Repository<OrderDetails>,

        @InjectRepository(Users)
        private usersRepository:Repository<Users>,

        @InjectRepository(Products)
        private productsRepository:Repository<Products>

    ){}

    async addOrder(userId:string,products:any){
        let total=0

        const user=await this.usersRepository.findOneBy({id:userId})

        if(!user) throw new NotFoundException(`user whit id ${userId} not found`)

        //creamos la orden:
        const order=new Orders()
        order.date=new Date()
        order.user=user
        // guardamos en la BD
        const newOrder=await this.ordersRepository.save(order)

        //asociar cada id recibido con rl producto:

        const productsArray=await Promise.all(
            products.map(async (element) => {
                const product = await this.productsRepository.findOneBy({
                    id:element.id
                })

                if(!product) throw new NotFoundException(`product whit id ${element.id} not found`)

                
                //calculamos el monto total

                total += Number(product.price)
                //actualizamos stock
                await this.productsRepository.update(
                    {id:element.id},
                    {stock:product.stock -1}
                )
                return product
            })
        )
        // crear el detalle de la orden y guardarlo en la BD
        const orderDetails= new OrderDetails()
        orderDetails.price=Number(Number(total).toFixed(2))
        orderDetails.products=productsArray
        orderDetails.orders=newOrder

        await this.orderDetailsRepository.save(orderDetails)

        return await this.ordersRepository.find({
            where:{id:newOrder.id}, 
            relations:{
                orderdetails:true
            }
        })
    }

    async getOrder(id:string){
        const order = await this.ordersRepository.findOne({
            where:{id},
            relations:{
                orderdetails:{
                    products:true
                }
            }
        })
        if(!order) throw new NotFoundException(`order whit id ${id} not found`)

        return order
    }
}