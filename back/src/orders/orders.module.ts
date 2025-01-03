import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from 'src/entities/orders.entities';
import { OrderDetails } from 'src/entities/orderDetails.entities';
import { Users } from 'src/entities/user.entities';
import { Products } from 'src/entities/products.enties';
import { ordersRepository } from './orders.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Orders,OrderDetails,Users,Products])],
  controllers: [OrdersController],
  providers: [OrdersService,ordersRepository],
  exports:[ordersRepository]
})
export class OrdersModule {}
