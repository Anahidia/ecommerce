import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetails } from "./orderDetails.entities";
import { ApiProperty } from '@nestjs/swagger';
import { Users } from "./user.entities";

@Entity({ name: "orders" })
export class Orders {
  @ApiProperty({ description: 'Unique identifier for the order', type: String })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Order date', type: Date })
    @Column()
  date: Date;

  @ApiProperty({ description: 'User associated with the order', type: () => Users })
  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ApiProperty({ description: 'Order details associated with the order', type: () => OrderDetails })
  @OneToOne(() => OrderDetails, (orderdetails) => orderdetails.orders, { cascade: true }) // Cascade para guardar automáticamente los detalles
  @JoinColumn({ name: 'order_id' })
  orderdetails: OrderDetails;
}
