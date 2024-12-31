import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products.enties";
import { Orders } from "./orders.entities";
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: "orderDetails" })
export class OrderDetails {
  @ApiProperty({ description: 'Unique identifier for the order detail', type: String })
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Price of the product in the order', type: Number }) 
  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false
  })
  price: number;

  @ApiProperty({ description: 'Products associated with the order details', type: () => [Products] })
  @ManyToMany(() => Products)
  @JoinTable({
    name: 'orderdetails_products',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'orderdetails_id',
      referencedColumnName: 'id',
    },
  })
  products: Products[];

@ApiProperty({ description: 'Order associated with the order details', type: () => Orders })
  @OneToOne(() => Orders, (orders) => orders.orderdetails)
  orders: Orders;
}
