import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./orders.entities";
import { ApiProperty } from '@nestjs/swagger';

@Entity({name:"users"})
export class Users{
    @ApiProperty({ description: 'Unique identifier for the user', type: String })
    @PrimaryGeneratedColumn('uuid')
    id:string
   
   
    @ApiProperty({ description: 'Email of the user', type: String,uniqueItems:true})
    @Column({
        type:"varchar",
        length:50,
        nullable:false,
        unique:true
    })
    email: string

    @ApiProperty({ description: 'Name of the user', type: String })
    @Column({
        type:"varchar",
        length:50,
        nullable:false
    })
    name: string

    @ApiProperty({ description: 'Password of the user', type: String })
    @Column({
        type:"varchar",
        length:120,
        nullable:false
    })
    password: string

    @ApiProperty({ description: 'Password of the user', type: String })
    @Column({
        type:"text"
    })
    address: string

    @ApiProperty({ description: 'Phone number of the user', type: Number })
    @Column({
        type:"int"
    })
    phone:number
    @ApiProperty({ description: 'Country of the user', type: String })
    @Column({
        length:50,
        type:"varchar"
    })
    country: string 

    @ApiProperty({ description: 'City of the user', type: String })
    @Column({
        type:"varchar",
        length:50,
    })
    city: string

    @ApiProperty({ description: 'Admin status of the user', type: Boolean, default: false })
    @Column({
            type:"boolean",
            default:false
        })
    isadmin:boolean
   
   
    @ApiProperty({ description: 'Orders associated with the user', type: () => [Orders] })
    @OneToMany(()=>Orders,(orders)=>orders.user)
    @JoinColumn({name:'order_id'})
    orders:Orders[]
}