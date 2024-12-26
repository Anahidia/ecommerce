import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products.enties";
import { ApiProperty } from '@nestjs/swagger';
@Entity({name:"categories"})
    export class Categories{
        @ApiProperty({ description: 'Unique identifier for the category', type: String })
        @PrimaryGeneratedColumn('uuid')
        id:string
        @ApiProperty({ description: 'Name of the category', type: String })
        @Column({
            type:"varchar",
            length:50,
            nullable:false,
            unique:true
        })
        name:string

        @ApiProperty({ description: 'Products associated with the category', type: () => [Products] })
       @OneToMany(()=> Products,(products)=> products.category)
       @JoinColumn()
       products:Products[]


    }
