import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categories } from "./categoris.entities";
import { OrderDetails } from "./orderDetails.entities";
import { ApiProperty } from '@nestjs/swagger';
@Entity({name:"products"})
export class Products{
    @ApiProperty({ description: 'Unique identifier for the product', type: String })
    @PrimaryGeneratedColumn('uuid')
    id:string

    @ApiProperty({ description: 'Name of the product', type: String })
    @Column({
        type:"varchar",
        length:50,
        nullable:false,
        unique:true
    })
    name: string
    @ApiProperty({ description: 'Description of the product', type: String })
    @Column({
        type:"text",
        nullable:false
    })
    description: string
    @ApiProperty({ description: 'Price of the product', type: Number })
    @Column({
        type:"decimal",
        precision:10,
        scale:2,
        nullable:false
    })
    price: number
    @ApiProperty({ description: 'Stock quantity of the product', type: Number })
    @Column({
       
        nullable:false
    })
    stock: number
    @ApiProperty({ description: 'Image URL of the product', type: String, default: 'https://...' })
    @Column({
        type:"text",
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkLnqRGsOXYnit3nIujSDu_UFEKoZ7WGZgVw&s"
    })
    imgUrl:string


    @ApiProperty({ description: 'Category associated with the product', type: () => Categories })
    @ManyToOne(()=>Categories,(category)=>category.products)
    @JoinColumn({name:'category_id'})
    category:Categories

  @ApiProperty({ description: 'Order details associated with the product', type: () => [OrderDetails] })
    @ManyToMany(()=> OrderDetails,(orderDetails)=>orderDetails.products)
    orderDetails:OrderDetails[]


}

